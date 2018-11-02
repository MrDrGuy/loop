/*
*Document Author: Joey Queppet
*Last Updated: 11/1/2018
*/

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Observable } from 'rxjs';
import { NavService } from '../core/nav.service';
import { appErrors } from '../core/Errors';
import { DatabaseService } from '../core/database.service';
import { AngularFirestoreModule, AngularFirestoreCollection,
   AngularFirestore, AngularFirestoreDocument }
from '@angular/fire/firestore';
import { Username } from '../core/interfaces';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {

//html variables
/*
*login
*email, password
*createAccount
*username, cEmail, cPassword, cPassword2
*/

//testing variables
  /*
  good = '445';
  sood = '';
  testemail = "17JoeQ747@gmail.com";
  testpassword = "password";
  testusername = "MrDrGuy";
  */

  //class variables
  errors = appErrors;
  userError : string = "";//display error
  //username document preperation
  usernameCollection: AngularFirestoreCollection = this.afs.collection('usernames');
  usernamesDoc = this.usernameCollection.valueChanges();
  usernames: Observable<Username>;
  newUsername : Observable<string>;
  usernameTaken: boolean


  constructor(
    public auth: AuthService,
    private afs : AngularFirestore
  ) {
  }

  ngOnInit() {
  }

  login(email:string,password:string){
    this.auth.loginWithEmail(email,password);
  }

/**
 * This method is initiated by button press.
 * It checks to make sure the passwords match, if so it calls the authentication functions.
 * @param email
 * @param password
 * @param username
 * @param password1
 * @param password2
 */
  createAccount(email:string, username:string,
  password1:string,password2:string){
    if(password1 == password2){
      this.auth.createAccount(email,password1,username);
    }else{
      console.log(this.errors.authError3);
      this.userError = this.errors.authError3;

    }
  }

  /**
   *Clears the error text displayed on screen.
   * */
    clearError(){
   this.userError = "";
    }

    /*
    * This function discovers if  a username is already taken.
    *From that point, it begins the create account action.
    *@param Email
    *@param usernames
    *@param password1
    *@param password2
    */
  verifyUsername(email:string,username:string,
  password1:string,password2:string){
    //verifyUsername
    console.log('entered button, username = ' + username);
    var regexUsername = username.replace(/\s/g, "").toLowerCase();
    var doc = this.afs.collection('usernames').doc(regexUsername).ref
    doc.get().then(doc=>{
      if(doc.exists){
        //console.log(doc.data());
        console.log(this.errors.authError4);
      }else{
        this.createAccount(email,regexUsername,password1,password2);
      }
    });
  }




  /*
  testerButton(){
    this.auth.createAccount(this.testemail,this.testpassword, 'username');
    this.good = "Created Account";
  }

  testerButton2(){
    this.us.getUsernames(this.testusername)
    //this.afs.checkUsernameAvailability(this.testusername);
    //this.nav.gotoMainScreen();
  }
  */

}
