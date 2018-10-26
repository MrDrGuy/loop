import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection }
from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  //document Nav
  filesCollection: AngularFirestoreCollection<any> = this.afs.collection('files');
  filesObs = this.filesCollection.valueChanges();


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


}
