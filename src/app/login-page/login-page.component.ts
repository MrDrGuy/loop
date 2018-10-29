import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Observable } from 'rxjs';
import { NavService } from '../core/nav.service';
import { appErrors } from '../core/Errors';
import { DatabaseService } from '../core/database.service';


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
  testemail = "15JoeQ747@gmail.com";
  testpassword = "password";
  */

  usernameError : string = "";

  constructor(
    public auth: AuthService,
    private afs : DatabaseService
  ) {
  }

  ngOnInit() {
  }

  login(email:string,password:string){
    this.auth.loginWithEmail(email,password);
  }

  createAccount(email:string,password:string){

  }
/*
  testerButton(){
    this.auth.createAccount(this.testemail,this.testpassword, 'username');
    this.good = "Created Account";
  }

  testerButton2(){
    this.auth.loginWithEmail(this.testemail,this.testpassword)
    //this.nav.gotoMainScreen();
  }
*/
}
