/*
*Document Author: Unknown
*Updated 11/14/2018 : Joey
*Last Updated: 11/15/2018 : Joey
*This class controls the main menu functions.
*/

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { appErrors } from '../core/Errors';
import { DatabaseService } from '../core/database.service';
import { AngularFirestoreModule, AngularFirestoreCollection,
   AngularFirestore, AngularFirestoreDocument }
from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Candidate, Files } from '../core/interfaces';
import { ModelPosition } from '../core/classTemplates/Positions';
import {appMessages} from '../core/Messages';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-new-candidate-dialog',
  templateUrl: './new-candidate-dialog.component.html',
  styleUrls: ['./new-candidate-dialog.component.css']
})
export class NewCandidateDialogComponent {
  currentPositionID: string;
  currentPosition: ModelPosition

  userID:string
  userEmail:string
  userPositions: Array<string>
  candidateEmail: string
  candidateFName: string
  candidateLName:string
  candidateAddress: string
  candidatePhoneNumber: string
  positionCandidates: Array<string> = [];
  positionCandidatesCount: number

  positionCollection: AngularFirestoreCollection<any> = this.afs.collection('positions'); // change <any> evenutally
  positionCollectionObs = this.positionCollection.valueChanges();
  candidateCollection: AngularFirestoreCollection<any> = this.afs.collection('candidates'); // change <any> evenutally
  candidateCollectionObs = this.candidateCollection.valueChanges();
  filesCollection: AngularFirestoreCollection<any> = this.afs.collection('files'); // change <any> evenutally
  filesCollectionObs = this.filesCollection.valueChanges();



  constructor(
    private dialogRef: MatDialogRef<NewCandidateDialogComponent>,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private data: DataService
  ) {
    this.afAuth.authState.subscribe(user =>{
        if(user){
          this.userID = user.uid;
          this.getUserData(user.uid);
        }else{
        }
      });

      this.data.currentPosition.subscribe(message => this.currentPosition);
      this.data.currentPositionID.subscribe(message => this.currentPositionID);
   }

/**
 * This init funciton gets the current data from the DataService.
 * This is used to pass data around the applicaiton.
 */
  ngOnInit(){
    this.data.currentPosition.subscribe(message => {
      this.currentPosition = message;
    });
    this.data.currentPositionID.subscribe(message => {
      this.currentPositionID = message;
    });
    this.data.positionCandidates.subscribe(message =>{
      this.positionCandidates = message;
    });

  }

  /**
   * This method closes this dialog instance, and updates the mainmenu to adjust for the changes.
   * */
  cancelNewCandidate(){
    this.dialogRef.close();
  }

  /**
 * This method takes the userID, and populates the local variables with
 * the user's data.
 * @param userID is the userID passed to it by the constructor
 */
  getUserData(userID){
    this.afs.collection('users').doc(userID).ref
    .get().then(doc=>{
    if(doc.exists){
      this.userEmail = doc.data().email;
      this.userPositions = doc.data().positions;
    }else{
      console.log(appErrors.MPErr3);
    }
  }).catch(err =>{
    console.log(err);
  });
  }

  /**
   * This method updates the user's candidates data in the
   * user's document.
   * */
  updatePositionCandidates(){
    this.positionCollection.doc(this.currentPositionID).update({
      //theContent: this.content,
      candidates: this.positionCandidates,
      candidatesCount : this.positionCandidatesCount
    });
  }

  /**
   * This method generates a candidateID using the User's email,
   * and a count variable stored in the user's data.
   *
   * It then adds the candidateID to the local list of candidates.
   *  (it also updates candidateCount at this point)
   *
   * It then calls the updateUserCanddiates method to update the new info.
   *
   * It then adds a new candidates document to the 'candidates' collection using
   * the inputed variables.
   * @param newAddress
   * @param newEmail
   * @param newFName
   * @param newLName
   * @param newPhone
   * @param newRecruiter
   */
  addCandidate(){
    //name candidate using candidatesCount
    const candidateID = this.userEmail + '_' + this.candidateEmail
     + (this.positionCandidates.length+1);
    //add candidate to userCandidate
    this.positionCandidates.push(candidateID);
    this.positionCandidatesCount = this.positionCandidates.length;
    //call updateCandidates
    this.updatePositionCandidates();
  //add candidate to candidates collection
    //create a new files document first
    this.newFiles(candidateID,this.userEmail);
    const userEmail = this.userEmail;
    const data: Candidate = {
      address: this.candidateAddress,
      email: this.candidateEmail,
      files: candidateID,
      fName: this.candidateFName,
      lName: this.candidateLName, //need a field here for last name to be pulled in
      phone: this.candidatePhoneNumber,
      recruiter: this.userEmail
    }

    this.candidateCollection.doc(candidateID).set(data)
    .then(()=>{
      console.log(appMessages.message2);
      this.cancelNewCandidate();
      this.data.updateTheMainMenu();
    });

  }
  /**
  * Adds a new Files document with the candidate's ID
  * as the files document ID.
  */
  newFiles(candidateID:string, recruiterID:string){
    const data: Files = {
      canidateID: candidateID,
      recruiterID: recruiterID,
      coverLetterRef: '',
      coverLetterDL: '',
      resumeRef: '',
      resumeDL: '',
      interviewQsRef: '',
      interviewQsDL: '',
      referencesRef: '',
      referencesDL: '',
    }

    this.filesCollection.doc(candidateID).set(data)
    .then(()=>{
      console.log(appMessages.message5);
      this.cancelNewCandidate();
    });
  }


}
