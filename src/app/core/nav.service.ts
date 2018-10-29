import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {appErrors} from './Errors';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  loggedIn : boolean
  errors : appErrors

  constructor(private router: Router, private afAuth :AngularFireAuth) {
    this.afAuth.authState.subscribe(user =>{
      if(user){
        this.loggedIn = true;
      }else{
        this.loggedIn = false;
      }
    })

  }

  public gotoLoginPage(){
    if(this.loggedIn){
      this.router.navigate(['../login-page']);
    }else{
      console.log(this.errors.getAuthErrors1);
    }
  }

  public gotoMainScreen(){
    if(this.loggedIn){
      this.router.navigate(['../main-screen']);
    }else{
      console.log(this.errors.getAuthErrors1);
    }
  }

}
