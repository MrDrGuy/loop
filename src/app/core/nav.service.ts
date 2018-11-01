/*
*Document Author: Joey Queppet
*Last Updated: 11/1/2018
*
*This service controls routing throughout the application.
 * I've implemented some auth logic into this, auth.guard can probabbly be deleted.
*/
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {appErrors} from './Errors';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  loggedIn : boolean;
  errors = appErrors;

  /**
   *declares router for routing, declares afAuth for access to the current user data.
   * 
   * @param router refers to the routes set in the app-routing.module
   * @param afAuth a Angularfire auth variable, used to see if the user is logged on.
   */
  constructor(private router: Router, private afAuth :AngularFireAuth) {
    this.afAuth.authState.subscribe(user =>{
      if(user){
        this.loggedIn = true;
      }else{
        this.loggedIn = false;
      }
    })

  }

  /**
   * Simple goto method. Takes the user to the login page.
   *
   */
  public gotoLoginPage(){
      this.router.navigate(['../login-page']);
  }

  /**
   *Goto method with authentication verification
   *If(user is logged in) goto page...
   **/
  public gotoMainScreen(){
    if(this.loggedIn){
      this.router.navigate(['../main-screen']);
    }else{
      console.log(this.errors.authError2);
    }
  }

}
