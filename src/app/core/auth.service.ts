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
import { Username } from '../core/interfaces';
import { appErrors } from '../core/Errors';

interface User {
  uid: string;
  email: string;
  username?: string;
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
  errors = appErrors;
  userame: string
  usernamesCollection: AngularFirestoreCollection<Username> = this.afs.collection('usernames');

  /*
  *Constructor checks to see if a user is currently logged in.
  *If so, it sets a local interface for the user data.
  */
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
      this.firstLoginWithEmail(email,password, username);
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
  firstLoginWithEmail(email:string, password:string, username:string){
    this.afAuth.auth.signInWithEmailAndPassword(email,password)
    .then(credential => {
      console.log('welcome user!');
      this.usernameSetup(email, username);
      this.nav.gotoMainScreen();
      return this.setUserDoc(credential.user, username)
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
      console.log(this.errors.authError5);
      console.log(error.message);
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
 private setUserDoc(user: User, username:string){
     const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

     const data: User = {
       uid: user.uid,
       email: user.email,
       username: username
     }

    return userRef.set(data)

  }

  //used to retrive the current user. Yet to be used.
  isLoggedIn() {
   return this.afAuth.authState.pipe(first()).toPromise();
 }

  /*
  *Upon the creation of  an account, this method is called
  *to create a username document in firestore with the
  * new user's username and email.
  */
   usernameSetup(theEmail:string, theUsername:string){
     this.usernamesCollection.doc(theUsername).set({
      email: theEmail,
      username: theUsername
    }).catch((err) => {
      console.log(err);
    });
   }








}
