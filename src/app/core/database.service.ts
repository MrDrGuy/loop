import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestoreModule, AngularFirestoreCollection,
   AngularFirestore, AngularFirestoreDocument }
from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  //document Nav
  filesCollection: AngularFirestoreCollection<any> = this.afs.collection('files');
  filesObs = this.filesCollection.valueChanges();

  usernamesCollection: AngularFirestoreCollection<any> = this.afs.collection('usernames');
  usernamesObs = this.usernamesCollection.valueChanges();


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
/*
  checkUsernameAvailability(newUsername:string){
    this.usernamesCollection.doc(`/${newUsername}`).get().pipe(
      then(docSnapshot => {
        if (docSnapshot.exists) {
          console.log('it exists');
          return true;
        }
      }).catch((errors) =>{
        console.log('it doesnt exists');
        return false;
      }));
  }
*/

}
