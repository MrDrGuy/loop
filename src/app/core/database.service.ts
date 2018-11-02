/*
*Document Author: Joey Queppet
*Last Updated: 11/1/2018
*
*This service controls setting data to the firestore database.
 * Very rough in production look, may be scrapped later.
*/

import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestoreModule, AngularFirestoreCollection,
   AngularFirestore, AngularFirestoreDocument }
from '@angular/fire/firestore';
import {Username} from './interfaces';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  //document Nav
  filesCollection: AngularFirestoreCollection<any> = this.afs.collection('files');
  filesObs = this.filesCollection.valueChanges();

  usernamesCollection: AngularFirestoreCollection<Username> = this.afs.collection('usernames');
  usernames = this.usernamesCollection.valueChanges();
  username: Observable<Username[]>;



  constructor(private afs: AngularFirestore) { }

  //Document handeling
  addDocument(){

  }

  updateDocument(fileID){
    this.filesCollection.doc(fileID).set({
      canidateID: '',
      recruiterID: '',
      coverLetterRef: '',
      coverLetterDL: '',
      resumeRef: '',
      resumeDL: '',
      interviewQsRef: '',
      interviewQsDL: '',
      referencesRef: '',
      referencesDL: ''
    }).catch((err) => {
      console.log(err);
    })
  }

  deleteDocument(){

  }

  //Recruiter Handeling
  addRecruiter(){

  }
  updateRecruiter(){

  }
  delteRecruiter(){

  }
  //canidate handeling
  addCanidate(){

  }
  updateCanidate(){

  }
  removeCanidate(){

  }

//queries
//https://github.com/angular/angularfire2/blob/master/docs/rtdb/querying-lists.md
//https://github.com/angular/angularfire2/issues/1272
//https://github.com/angular/angularfire2/blob/master/docs/firestore/collections.md

  checkUsernameAvailability(newUsername:string){
    //this.usernamesCollection.doc(`/${newUsername}`)


  }




}
