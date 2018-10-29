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


  //logs a user into the application.
  createAccount(email:string, password:string, username:string){
    this.afAuth.auth.createUserWithEmailAndPassword(email,password)
    .then(() =>{
      this.firstLoginWithEmail(email,password);
    }    ).catch(error =>{
      console.log(error);
    });
  }

  firstLoginWithEmail(email:string, password:string){
    var myError = "";
    this.afAuth.auth.signInWithEmailAndPassword(email,password)
    .then(credential => {
      console.log('welcome user!');
      this.nav.gotoMainScreen();
      return this.setUserDoc(credential.user)
    }).catch(error =>{
      myError = error;
    })
    return myError;
  }

  loginWithEmail(email:string, password:string){
    this.afAuth.auth.signInWithEmailAndPassword(email,password)
    .then(credential => {
      console.log('Welcome to LOOP!');
      this.nav.gotoMainScreen();
    }).catch(error =>{
      const code = error.code;
      //can't seem to convert to string... needs to be fixed.
      const message = error.message;
      if(code == 'auth/wrong-password'){
        console.log(message);
      }
    })
  }

  //update the properties of the user
  updateUser(user: User, data: any){
    return this.afs.doc(`users/${user.uid}`).update(data)
  }


  //on login, this sets up the user's user doc
  private setUserDoc(user){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email
    }

    return userRef.set(data)

  }


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
