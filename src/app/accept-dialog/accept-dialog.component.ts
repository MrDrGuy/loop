import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-accept-dialog',
  templateUrl: './accept-dialog.component.html',
  styleUrls: ['./accept-dialog.component.css']
})

export class AcceptDialogComponent {
  constructor(private dialogRef: MatDialogRef<AcceptDialogComponent>) { }
  
  cancelAccept(){
    this.dialogRef.close();
  }
}
