import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent {
  constructor(private dialogRef: MatDialogRef<UploadDialogComponent>) { }
  
  cancelUpload(){
    this.dialogRef.close();
  }

}
