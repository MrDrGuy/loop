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

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
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
  createAccount(email:string, password:string){
    this.afAuth.auth.createUserWithEmailAndPassword(email,password)
    .then(credential =>{
      return this.setUserDoc(credential);
    }).catch(error =>{
      this.handleError(error);
    });
  }

  loginWithEmail(email:string, password:string){
    this.afAuth.auth.signInWithEmailAndPassword(email,password)
    .then(credential => {
      console.log('welcome user!');
      return this.setUserDoc(credential.user)
    }).catch(error =>{
      this.handleError(error);
    })
  }

  //update the properties of the user
  updateUser(user: User, data: any){
    return this.afs.doc(`users/${user.uid}`).update(data)
  }


  private handleError(error){
    console.error(error);
    console.log(error);
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
