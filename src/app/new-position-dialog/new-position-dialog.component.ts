/*
*Document Author: Unknown
*Updated 11/14/2018 : Joey
*Last Updated: 11/15/2018 : Joey
*This class controls the main menu functions.
*/

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import * as firebase from 'firebase/app'; // needed to import firestore below
import { AngularFirestoreModule, AngularFirestore,
   AngularFirestoreCollection, AngularFirestoreDocument }
    from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import {appErrors} from '../core/Errors';
import {appMessages} from '../core/Messages';
import { Recruiter } from '../core/classTemplates/users';
import { Candidate, Position } from '../core/interfaces';
import { DataService } from '../core/data.service';


@Component({
  selector: 'app-new-position-dialog',
  templateUrl: './new-position-dialog.component.html',
  styleUrls: ['./new-position-dialog.component.css']
})
export class NewPositionDialogComponent {

userID:string;
userEmail:string;
userPositions:Array<string>;
userPositionsCount:number;
positionCollection: AngularFirestoreCollection<any> = this.afs.collection('positions'); // change <any> evenutally
positionCollectionObs = this.positionCollection.valueChanges();
userCollection: AngularFirestoreCollection<any> = this.afs.collection('users'); // change <any> evenutally
userCollectionObs = this.userCollection.valueChanges();

  constructor(
    private dialogRef: MatDialogRef<NewPositionDialogComponent>,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private data: DataService
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

  /**
   * This method simply closes the dialog instance.
   * */
  cancelNewPosition(){
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
      this.userPositionsCount = doc.data().positionsCount;
    }else{
      console.log(appErrors.MPErr3);
    }
  }).catch(err =>{
    console.log(err);
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

    addPosition(newTitle:string){
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
        description: "",
        recruiter: userEmail,
        candidates: emptyStringArray,
        candidatesCount: 0,
        title: newTitle
      }
      this.positionCollection.doc(positionID).set(data)
      .then(()=>{
        console.log(appMessages.message4);
        this.dialogRef.close();
        this.data.updateTheMainMenu();
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

}
