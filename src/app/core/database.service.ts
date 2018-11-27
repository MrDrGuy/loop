/*
*Document Author: Joey Queppet
*Last Updated: 11/1/2018
*Scheduled to be deleted by sunday,11/18/2018
*This service controls setting data to the firestore database.
 * Very rough in production look, may be scrapped later.
*/

import { Injectable } from '@angular/core';
import { ModelPosition } from './classTemplates/Positions';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

//constructor(private afs: AngularFirestore) { }

  /*
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

  */

//queries
//https://github.com/angular/angularfire2/blob/master/docs/rtdb/querying-lists.md
//https://github.com/angular/angularfire2/issues/1272
//https://github.com/angular/angularfire2/blob/master/docs/firestore/collections.md

  checkUsernameAvailability(newUsername:string){
    //this.usernamesCollection.doc(`/${newUsername}`)


  }




}
