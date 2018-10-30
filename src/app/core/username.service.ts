import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestoreModule, AngularFirestoreCollection,
   AngularFirestore, AngularFirestoreDocument }
from '@angular/fire/firestore';
//import {Username} from './interfaces';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Username {
  username: string;
  usernameLower: string;
  recruiterEmail: string;
}


@Injectable({
  providedIn: 'root'
})
export class UsernameService {
  //refrence to data, list of docs
  usernamesDoc: AngularFirestoreDocument<Username>;
  //get data back as observable, which is an array of data
  usernames: Observable<Username>;

  constructor(private afs: AngularFirestore) {

   }
/*  damn it works!
   getUsernames(newUsername:string){
     this.usernamesDoc = this.afs.doc(`usernames/${newUsername}`);
     this.usernames = this.usernamesDoc.valueChanges();
     this.usernames.subscribe(data =>{
       console.log('inside sub');
       console.log(data);
     })
     console.log(this.usernames);
   }
   */
   getUsernames(newUsername:string){
     this.usernamesDoc = this.afs.doc(`usernames/${newUsername}`);
     this.usernames = this.usernamesDoc.valueChanges();
     this.usernames.subscribe(data =>{
       console.log('inside sub');
       console.log(data);
     })
     console.log(this.usernames);
   }
}
