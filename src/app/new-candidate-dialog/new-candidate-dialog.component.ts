import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-candidate-dialog',
  templateUrl: './new-candidate-dialog.component.html',
  styleUrls: ['./new-candidate-dialog.component.css']
})
export class NewCandidateDialogComponent {

  constructor(private dialogRef: MatDialogRef<NewCandidateDialogComponent>) { }
  
  cancelNewCandidate(){
    this.dialogRef.close();
  }

}
