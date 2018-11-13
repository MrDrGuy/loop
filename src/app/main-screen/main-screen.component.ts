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
    }else{
      console.log('This user does not exist');
    }
  }).catch(err =>{
    console.log(err);
  });
  }

}
