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
import { Candidate, Position } from '../core/interfaces';
import { ModelPosition } from '../core/classTemplates/Positions';


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
  userPositions: Array<string>;
  userPositionsCount: number;
  userCollection: AngularFirestoreCollection<any> = this.afs.collection('users'); // change <any> evenutally
  userCollectionObs = this.userCollection.valueChanges();
  candidateCollection: AngularFirestoreCollection<any> = this.afs.collection('candidates'); // change <any> evenutally
  candidateCollectionObs = this.candidateCollection.valueChanges();
  positionCollection: AngularFirestoreCollection<any> = this.afs.collection('positions'); // change <any> evenutally
  positionCollectionObs = this.positionCollection.valueChanges();



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
      this.userPositions = doc.data().positions;
      this.userPositionsCount = doc.data().positionsCount;
    }else{
      console.log(appErrors.MPErr3);
    }
  }).catch(err =>{
    console.log(err);
  });
  }

  getPositionData(positionID){
    this.afs.collection('positions').doc(positionID).ref
    .get().then(doc=>{
    if(doc.exists){
      const theCandidates = doc.data().candidates;
      const theCandidatesCount = doc.data().candidatesCount;
      const theDescription = doc.data().description;
      const theRecruiter = doc.data().description;
      return new ModelPosition(theDescription,theRecruiter,
        theCandidates,theCandidatesCount);
    }else{
      console.log(appErrors.MPErr3);
    }
  }).catch(err =>{
    console.log(err);
  });
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
   * This method updates the position's candidates data in the
   * user's document.
   * */
  updatePositionCandidates(positionID){

    this.positionCollection.doc(positionID).update({
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
  addCandidate(positionID:string, newAddress: string, newEmail: string, newFName: string,
  newLName: string, newPhone: string, newRecruiter: string){
    //name candidate using candidatesCount
    const predictionData = this.getPositionData(predictionID);
    const candidateID = this.userEmail + '_Candidate_' + predictionData.candidatesCount;
    //add candidate to userCandidate
    predictionData.candidates.push(candidateID);
    predictionData.candidatesCount++;
    //call updateCandidates
    this.updatePositionCandidates();
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
  deleteCandidate(positionID:string, candidateID:string){
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

  /**
   * This method updates the user's positions data in the
   * user's document.
   * */
  updateUserPositions(){
    this.userCollection.doc(this.userID).update({
      //theContent: this.content,
      positions: this.userPositions,
      positionsCount : this.userPositionsCount
    });
  }

  /**
   * This method generates a positionID using the User's email,
   * and a count variable stored in the user's data.
   *
   * It then adds the positionID to the local list of position.
   *  (it also updates positionCount at this point)
   *
   * It then calls the updateUserPosition method to update the new info.
   *
   * It then adds a new position document to the 'positions' collection using
   * the inputed variables.
   * @param newAddress
   * @param newEmail
   * @param newFName
   * @param newLName
   * @param newPhone
   * @param newRecruiter
   */
  addPosition(newDescription:string){
    //name candidate using candidatesCount
    const positionID = this.userEmail + '_' + this.userPositionsCount;
    //add candidate to userCandidate
    this.userPositions.push(positionID);
    this.userPositionsCount++;
    //call updateCandidates
    this.updateUserPositions();
    //add candidate to candidates collection
    const emptyStringArray: string[] = [];
    const userEmail = this.userEmail;
    const data: Position = {
      description: newDescription,
      recruiter: userEmail,
      candidates: emptyStringArray,
      candidateCount: 0
    }

    this.positionCollection.doc(positionID).set(data)
    .then(()=>{
      console.log(appMessages.message4);
    });

  }

  /**
   * The method deletes the position information from the local positions
   * variable
   *
   * It then calls updateUserPositions which updates the positions variable stored
   * in the user's document
   *
   * IT then deletes the position document in the 'positions' collection
   * with the ID specified by the param Position ID.
   * @param positionID
   */
  deletePosition(positionID:string){
    //remove candidate from userCanddiate
    this.userPositions.forEach( (position, index) => {
       if(position === positionID) this.userPositions.splice(index,1);
     });
    //call updateCandidates
    this.updateUserPositions();
    //delete from candidates collection
    this.positionCollection.doc(positionID)
      .delete().then(() => {
        console.log(appMessages.message3);
      }).catch(error =>{
        console.log(error);
      });
  }

  //---------------------Testing Methods-------------------------
  //testing method
  addCandidateTest(){
  this.addCandidate('newAddress', 'newEmail', 'newFName',
  'newLName', 'newPhone', 'newRecruiter');
  }
  //testing button
  deleteCandidateTest(){
  this.deleteCandidate('');
  }

  addPositionTest(){
  this.addPosition('newDescription');
  }
  //testing button
  deletePositionTest(){
  this.deletePosition('example3@example.com_0');
  }

}
