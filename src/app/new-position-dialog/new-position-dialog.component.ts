import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-position-dialog',
  templateUrl: './new-position-dialog.component.html',
  styleUrls: ['./new-position-dialog.component.css']
})
export class NewPositionDialogComponent {

  constructor(private dialogRef: MatDialogRef<NewPositionDialogComponent>) { }
  
  cancelNewPosition(){
    this.dialogRef.close();
  }

}
