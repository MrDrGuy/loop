import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-reject-dialog',
  templateUrl: './reject-dialog.component.html',
  styleUrls: ['./reject-dialog.component.css']
})
export class RejectDialogComponent {

  constructor(private dialogRef: MatDialogRef<RejectDialogComponent>) { }
  
  cancelReject(){
    this.dialogRef.close();
  }

}
