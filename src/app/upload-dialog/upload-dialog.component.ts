import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

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
  constructor(private dialogRef: MatDialogRef<UploadDialogComponent>) { }
  
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
    uploadAPI: {
      url:"https://example-file-upload-api"
    }
};

}
