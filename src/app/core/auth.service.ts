/*
*Document Author: Joey Queppet
*Last Updated: 11/1/2018
*
*This service controls the authentication procedures of the application. 
*/

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestoreModule, AngularFirestore,
   AngularFirestoreCollection, AngularFirestoreDocument }
    from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { map, switchMap, first } from 'rxjs/operators';
import { Recruiter } from './classTemplates/users';
import { NavService } from '../core/nav.service';

interface User {
  uid: string;
  email: string;
  fname?: string;
  lname?: string;
  candidates? : Array<string>;
  positions? : Array<string>;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user : Observable<User>
  userKey : any
  loginError : string

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private nav: NavService
  ) {
    //get auth data and firestore Document
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        }else {
          return of(null)
        }
      })
    )
  }


  /**
   *Handels the account creation use case. Calls a login attempt as well if completed.
   * @param email
   * @param password
   * @param username
   */
  createAccount(email:string, password:string, username:string){
    this.afAuth.auth.createUserWithEmailAndPassword(email,password)
    .then(() =>{
      this.firstLoginWithEmail(email,password);
    }    ).catch(error =>{
      console.log(error);
    });
  }

  /**
   *The first login sets the user's information upon logging in for the first time.
   * It grabs the credentials, then passes them to the setUserDoc.
   * Navigats to main screen if successful.
   * @param email
   * @param password
   */
  firstLoginWithEmail(email:string, password:string){
    this.afAuth.auth.signInWithEmailAndPassword(email,password)
    .then(credential => {
      console.log('welcome user!');
      this.nav.gotoMainScreen();
      return this.setUserDoc(credential.user)
    }).catch(error =>{
      console.log(error);
    })
  }

  /**
   *Standard login proceedure using email and password.
   * Navigats to main screen if successful.
   * @param email
   * @param password
   */
  loginWithEmail(email:string, password:string){
    this.afAuth.auth.signInWithEmailAndPassword(email,password)
    .then(credential => {
      console.log('Welcome to LOOP!');
      this.nav.gotoMainScreen();
    }).catch(error =>{
      const code = error.code;
      const message = error.message;
      if(code == 'auth/wrong-password'){
        console.log(message);
      }
    })
  }

  //update the properties of the user, yet to see if needed.
  updateUser(user: User, data: any){
    return this.afs.doc(`users/${user.uid}`).update(data)
  }


  /**
   *Uses the constructor call, and the observable of interface User.
   * creates a user doc with the new user's information.
   * @param user
   */
  private setUserDoc(user){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email
    }

    return userRef.set(data)

  }

  //used to retrive the current user. Yet to be used. 
  isLoggedIn() {
   return this.afAuth.authState.pipe(first()).toPromise();
}
/*
async getUID() {
   const user = await this.isLoggedIn()
   if (user) {
     return user.uid;
   } else {
     console.log('user is not signed in');
     return null;
  }
}
*/



}
