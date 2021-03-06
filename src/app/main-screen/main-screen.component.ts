/*
*Document Author: Joey Queppet
*Updated 11/13/2018 : Joey
*Last Updated 11/14/2018 : Joey
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
import { ModelCandidate } from '../core/classTemplates/Candidates';
import { DataService } from '../core/data.service';
import { AuthService } from '../core/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})

export class MainScreenComponent implements OnInit {
//--------------local variables and declarations--------
  userID: string;
  userEmail: string;
  userUsername: string;
  userFName: string;
  userLName: string;
  userPositions: Array<string>;
  userPositionsCount: number;
  positionList: ModelPosition[] = [];
  currentPosition: ModelPosition;
  currentPositionID:string;
  positionCandidateList: ModelCandidate[] = [];
  canAddNewCandidate:boolean = false;


  // Modal references
  acceptDialogRef: MatDialogRef<AcceptDialogComponent>;
  rejectDialogRef: MatDialogRef<RejectDialogComponent>;
  uploadDialogRef: MatDialogRef<UploadDialogComponent>;
  newPositionDialogRef: MatDialogRef<NewPositionDialogComponent>;
  newCandidateDialogRef: MatDialogRef<NewCandidateDialogComponent>;

  //firebase references, not things that can be referenced locally.
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
    private afAuth: AngularFireAuth,
    private data: DataService,
    private authService : AuthService
    ) {
    }

    ngOnInit(){
      this.data.currentPosition.subscribe(message =>{
        const title = message.getTitle();
        if(!(title == 'example')){
          this.currentPosition = message;
          this.getAllCandidateData();
        };
      });
      this.data.currentPositionID.subscribe(message =>{
        this.currentPositionID = message;
      });
      this.data.updateMainMenu.subscribe(message => {
        this.positionList = [];
        this.positionCandidateList = [];
        this.afAuth.authState.subscribe(user =>{
          console.log('updating Main Menu');
            if(user){
              console.log('Welcome,', user.uid,'!');
              this.userID = user.uid;
              this.getUserData(user.uid);
            }else{
              console.log('User is not logged in.');
            }
          });
      });
      this.data.newCandidate.subscribe(message =>{
        if(this.canAddNewCandidate){
          this.addNewCandidate(message);
        }
        this.canAddNewCandidate = true;
      });
      //this.loadfirstPosition();
    }
//------------------------ngInitButtons-----------------------------
  openAcceptDialog() {
    this.acceptDialogRef = this.dialog.open(AcceptDialogComponent);
  }

  openRejectDialog() {
    this.rejectDialogRef = this.dialog.open(RejectDialogComponent);
  }

  openUploadDialog(candidateID:string) {
    this.data.changeTargetCandidateID(candidateID);
    this.uploadDialogRef = this.dialog.open(UploadDialogComponent);
  }

  openNewPositionDialog() {
    this.newPositionDialogRef = this.dialog.open(NewPositionDialogComponent);
  }

  openNewCandidateDialog() {
    this.newCandidateDialogRef = this.dialog.open(NewCandidateDialogComponent);
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
      this.userLName = doc.data().lName;
      this.userPositions = doc.data().positions;
      this.userPositionsCount = doc.data().positionsCount;
      this.getAllPositionData();
    }else{
      console.log(appErrors.MPErr3);
    }
  }).catch(err =>{
    console.log(err);
  });
  }

  /**
   *
   * This method retrives the data for a given position and stores it as a
   * positon model object inside the global variable positionList.
   * @param positionID is the positon ID used to identify the desired positon
   *                   in the firebase collection.
   */
  getPositionData(positionID){
    this.afs.collection('positions').doc(positionID).ref
    .get().then(doc=>{
    if(doc.exists){
      const theCandidates = doc.data().candidates;
      const theCandidatesCount = doc.data().candidatesCount;
      const theDescription = doc.data().description;
      const theRecruiter = doc.data().description;
      const theTitle = doc.data().title;
      const thePositionID = positionID;
      this.positionList.push( new ModelPosition(theDescription,theRecruiter,
        theCandidates,theCandidatesCount, theTitle, thePositionID));
      console.log('a new position was added to the list.');
    }else{
      console.log(appErrors.MPErr3);
    }
  }).catch(err =>{
    console.log(err);
  });
  }


  /**
   * A method to retrive all the postion data using the positionID array in the user's variables.
   * */
  getAllPositionData(){
    if(this.positionsExist()){
      this.userPositions.forEach((aPosition)=>{
        this.getPositionData(aPosition);
        console.log(aPosition);
      })
    }else{
      //catch for the front end
    }
  }

  /**
   * This method retrives the candidate information for a given candidateID and
   * stores it in the global variable positionCandidateList.
   * @param candidateID
   */
  getCandidateData(candidateID){
    this.afs.collection('candidates').doc(candidateID).ref
    .get().then(doc=>{
    if(doc.exists){
      const theFName = doc.data().fName;
      const theLName = doc.data().lName;
      const theEmail = doc.data().email;
      const theRecruiter = doc.data().recruiter;
      const thePhoneNumber = doc.data().phoneNumber;
      const theSocialMedia = doc.data().socialMedia;
      const theFiles = doc.data().files;
      const theCandidateID = candidateID
      this.positionCandidateList.push( new ModelCandidate(theFName, theLName,
      theEmail,theRecruiter, thePhoneNumber, theSocialMedia, theFiles, theCandidateID));
    }else{
      console.log(appErrors.MPErr1);
    }
  }).catch(err =>{
    console.log(err);
  });
  }



  /**
   * A method to retrive all the candidate data.
   * not yet utilized...
   * */
  getAllCandidateData(){
    if(this.candidatesExist){
      const candidateList = this.currentPosition.getCandidates()
      candidateList.forEach((candidate)=>{
        this.getCandidateData(candidate)
      })
    }else{
      //catch for the front end
    }
  }

  /**
   * Checks to see if the position's candidate array is empty or not.
   * */
  candidatesExist(){
    if(this.positionCandidateList.length == 0){
      console.log(appErrors.MPErr1)
    }else{
      return true;
    }
  }

  /**
   * adds a new candidate to the position's candidate list
   * */
  addNewCandidate(candidate:ModelCandidate){
    this.positionCandidateList.push(candidate);
  }

  /**
   * This method checks if positions has any information.
   *
   * */
  positionsExist(){
    if(this.userPositions.length == 0){
      console.log(appErrors.MPErr2)
    }else{
      return true;
    }
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
    var targetIndex;
    //remove position from userPositions
    this.userPositions.forEach( (position, index) => {
       if(position === positionID){
         this.userPositions.splice(index,1);
         targetIndex = index;
       };
     });
    //call updatePositions
    this.updateUserPositions();
    //get the position candidatesCount

    const targetCandidates = this.positionList[targetIndex];
    targetCandidates.candidates.forEach( candidate =>{
      this.deleteCandidate(candidate, true);
    })
    //delete from positions collection
    this.positionCollection.doc(positionID)
      .delete().then(() => {
        this.data.updateTheMainMenu();
        console.log(appMessages.message3);
      }).catch(error =>{
        console.log(error);
      });
  }

  /**
   * The method has two functions:
   * -if the boolen is true, it will only delete candidates
   * -if the boolean is false, that means it is not in mass, and deletes the candidate
   *     and updates the page.
   *
   * @param candidate is the string address to the candidate Document
   * @param muli indicates if the delete function is working with a single,
   *              or multiple deletions.
   */
  deleteCandidate(candidate:string,multi:boolean){
    if(!multi){
      this.candidateCollection.doc(candidate)
        .delete().catch(err =>{
          console.log(err);
        }).then(()=>{
          this.data.updateTheMainMenu();
        });
    }else{
      this.candidateCollection.doc(candidate)
        .delete().catch(err =>{
          console.log(err);
        });
    }
  }

/*
  loadfirstPosition(){
    console.log('loading postion');
    if(this.positionList.length == 0){
      //decide some error.
    }else if(this.positionList.length == 1){
      this.data.changeCurrentPosition(this.positionList[0]); //sets the current position
      this.data.changeCurrentPositionID(this.positionList[0].getPositionID()); // sets current postion ID
      this.data.changePositionCandidates(this.positionList[0].getCandidates()); //sets the current canddiates
    }else{
      this.loadNewPosition(this.currentPositionID);
    }
  }
*/
  loadNewPosition(newPositionID:string){
    var newPositionIndex;
    var breakException = {};

    this.positionList.forEach( (position, index) =>{
      if(position.positionID == newPositionID){
        newPositionIndex = index;
      }
    });
    this.data.changeCurrentPosition(this.positionList[newPositionIndex]); //sets the current position
    this.data.changeCurrentPositionID(newPositionID); // sets current postion ID
    this.data.changePositionCandidates(this.positionList[newPositionIndex].getCandidates()); //sets the current canddiates
    this.data.updateTheMainMenu();
  }

  loadDummyPostion(){
    //fill in with one blank position, and one blank candidate.
  }

  /*
  *triggers the LogOut method in auth
  */
  logoutPressed(){
    this.authService.logOut();
  }




  //---------------------Testing Methods-------------------------
  //testing method

  //testing button
  deletePositionTest(){
  this.deletePosition('example3@example.com_0');
  }

  testButton(){
    console.log(this.positionCandidateList);
  }

  /*
  testButton(){
    this.data.changeCurrentPosition(this.positionList[0]);
    console.log(this.positionList[0]);
    this.data.changeCurrentPositionID('example7@example.com_0');
    this.data.changePositionCandidates(this.positionList[0].getCandidates());
  }
  */
}
