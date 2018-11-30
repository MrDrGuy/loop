import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DataService } from '../core/data.service';
import * as firebase from 'firebase/app'; // needed to import firestore below
import { AngularFirestoreModule, AngularFirestore,
   AngularFirestoreCollection, AngularFirestoreDocument }
    from '@angular/fire/firestore';
import { AngularFireStorage , AngularFireStorageReference } from '@angular/fire/storage';

export interface Types {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})

export class UploadDialogComponent {
  candidateID:string
  private file:File
  private fileRef:AngularFireStorageReference
  private allowUpload:boolean = false;
  private type:string


  constructor(
    private dialogRef: MatDialogRef<UploadDialogComponent>,
    private data: DataService,
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage

  ) { }

  ngOnInit(){
    this.data.targetCandidateID.subscribe(message => {
      this.candidateID = message;
    });
  }

  uploadFile(event, type:string) {
    if(!(type == null)){
      this.type = type;
      this.file = event.target.files[0];
      const filePath = `/${this.candidateID}/` + type;
      this.fileRef = this.afStorage.ref(filePath);
      this.allowUpload = true;
    }else{
      this.allowUpload = false;
    }

    //const task = ref.put(file);
    //this.afStorage.upload('/upload/to/this-path', event.target.files[0]);
  }

  saveUpload(file:File, type:string){
    if(this.allowUpload){
      const task = this.fileRef.put(this.file).then();
      this.dialogRef.close();
    }
  }


  cancelUpload(){
    this.dialogRef.close();
  }

  types: Types[] = [
    {value: 'resume-0', viewValue: 'Resume'},
    {value: 'cover-1', viewValue: 'Cover Letter'},
    {value: 'notes-2', viewValue: 'Interview Notes'},
    {value: 'ref-3', viewValue: 'References'},
    {value: 'web-4', viewValue: 'Website'}
  ];

  afuConfig = {
    maxSize: "1",
    uploadAPI: {
      url:"https://example-file-upload-api"
    }
};

}
