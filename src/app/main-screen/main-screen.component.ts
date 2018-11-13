/*
*Document Author: Joey Queppet
*Last Updated: 11/13/2018 : Joey
*This class controls the main menu functions.
*/

import { Component, OnInit } from '@angular/core';
import { AcceptDialogComponent } from '../accept-dialog/accept-dialog.component';
import { RejectDialogComponent } from '../reject-dialog/reject-dialog.component';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';
import { NewPositionDialogComponent } from '../new-position-dialog/new-position-dialog.component';
import { NewCandidateDialogComponent } from '../new-candidate-dialog/new-candidate-dialog.component';
import { MatDialog, MatDialogRef } from "@angular/material";
import * as firebase from 'firebase/app'; // needed to import firestore below
import { AngularFirestoreModule, AngularFirestore,
   AngularFirestoreCollection, AngularFirestoreDocument }
    from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import {appErrors} from '../core/Errors';
import {appMessages} from '../core/Messages';
import { Candidate } from '../core/interfaces';


@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})

export class MainScreenComponent implements OnInit {
//--------------local variables and declarations--------
  acceptDialogRef: MatDialogRef<AcceptDialogComponent>;
  rejectDialogRef: MatDialogRef<RejectDialogComponent>;
  uploadDialogRef: MatDialogRef<UploadDialogComponent>;
  newPositionDialogRef: MatDialogRef<NewPositionDialogComponent>;
  newCandidateDialogRef: MatDialogRef<NewCandidateDialogComponent>;
  userID: string;
  userEmail: string;
  userUsername: string;
  userFName: string;
  userLName: string;
  userCandidates: Array<string>;
  userPositions: Array<string>;
  userCandidatesCount: number;
  userPositionsCount: number;
  userCollection: AngularFirestoreCollection<any> = this.afs.collection('users'); // change <any> evenutally
  userCollectionObs = this.userCollection.valueChanges();
  candidateCollection: AngularFirestoreCollection<any> = this.afs.collection('candidates'); // change <any> evenutally
  candidateCollectionObs = this.userCollection.valueChanges();



//-------------Constructor-----------------------------
  constructor(
    private dialog: MatDialog,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth
    ) {
    this.afAuth.authState.subscribe(user =>{
        if(user){
          console.log('Welcome,', user.uid,'!');
          this.userID = user.uid;
          this.getUserData(user.uid);
        }else{
        }
      });
    }
//------------------------Buttons-----------------------------
  openAcceptDialog() {
    this.acceptDialogRef = this.dialog.open(AcceptDialogComponent);
  }

  openRejectDialog() {
    this.rejectDialogRef = this.dialog.open(RejectDialogComponent);
  }

  openUploadDialog() {
    this.uploadDialogRef = this.dialog.open(UploadDialogComponent);
  }

  openNewPositionDialog() {
    this.newPositionDialogRef = this.dialog.open(NewPositionDialogComponent);
  }

  openNewCandidateDialog() {
    this.newCandidateDialogRef = this.dialog.open(NewCandidateDialogComponent);
  }

  ngOnInit() {
  }

//-----------------------Methods-------------------------------------

/**
 * This method takes the userID, and populates the local variables with
 * the user's data.
 * @param userID is the userID passed to it by the constructor
 */
  getUserData(userID){
    this.afs.collection('users').doc(userID).ref
    .get().then(doc=>{
    if(doc.exists){
      this.userUsername = doc.data().username;
      this.userEmail = doc.data().email;
      this.userFName = doc.data().fName;
      this.userFName = doc.data().fName;
      this.userCandidates = doc.data().candidates;
      this.userPositions = doc.data().positions;
      this.userCandidatesCount = doc.data().candidatesCount;
      this.userPositionsCount = doc.data().positionsCount;
    }else{
      console.log(appErrors.MPErr3);
    }
  }).catch(err =>{
    console.log(err);
  });
  }

  /**
   * This method checks if candidates has any information.
   *
   * */
  candidatesExist(){
    if(this.userCandidates.length == 0){
      console.log(appErrors.MPErr1)
      return false
    }else{
      return true;
    }
  }

  /**
   * This method checks if positions has any information.
   *
   * */
  postionsExist(){
    if(this.userPositions.length == 0){
      console.log(appErrors.MPErr2)
    }else{
      return true;
    }
  }

  /**
   * This method updates the user's candidates data in the
   * user's document.
   * */
  updateUserCandidates(){
    this.userCollection.doc(this.userID).update({
      //theContent: this.content,
      candidates: this.userCandidates,
      candidatesCount : this.userCandidatesCount
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
  addCandidate(newAddress: string, newEmail: string, newFName: string,
  newLName: string, newPhone: string, newRecruiter: string){
    //name candidate using candidatesCount
    const candidateID = this.userEmail + '_' + this.userCandidatesCount;
    //add candidate to userCandidate
    this.userCandidates.push(candidateID);
    this.userCandidatesCount++;
    //call updateCandidates
    this.updateUserCandidates();
    //add candidate to candidates collection
    const emptyStringArray: string[] = [];
    const userEmail = this.userEmail;
    const data: Candidate = {
      address: newAddress,
      email: newEmail,
      files: emptyStringArray,
      fName: newFName,
      lName: newLName,
      phone: newPhone,
      recruiter: userEmail
    }

    this.candidateCollection.doc(candidateID).set(data)
    .then(()=>{
      console.log(appMessages.message1);
    });

  }

  /**
   * The method deletes the candidate information from the local candidates
   * variable
   *
   * It then calls updateUserCandidates which updates the candidates variable stored
   * in the user's document
   *
   * IT then deletes the candidate document in the 'candidates' collection
   * with the ID specified by the param Candidate ID.
   * @param candidateID
   */
  deleteCandidate(candidateID:string){
    //remove candidate from userCanddiate
    this.userCandidates.forEach( (candidate, index) => {
       if(candidate === candidateID) this.userCandidates.splice(index,1);
     });
    //call updateCandidates
    this.updateUserCandidates();
    //delete from candidates collection
    this.candidateCollection.doc(candidateID)
      .delete().then(() => {
        console.log(appMessages.message1);
      }).catch(error =>{
        console.log(error);
      });
  }

  //testing button
  addCandidateTest(){
  this.addCandidate('newAddress', 'newEmail', 'newFName',
  'newLName', 'newPhone', 'newRecruiter');
  }
  //testing button
  deleteCandidateTest(){
  this.deleteCandidate('example3@example.com_1');
  }

}
