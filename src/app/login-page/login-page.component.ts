import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {

  good = '445';
  sood = '';

  email = "15JoeQ747@gmail.com";
  password = "password";

  constructor(public auth: AuthService) {
    //this.good = "welcome";
  }

  ngOnInit() {
  }

  testerButton(){
    this.auth.createAccount(this.email,this.password);
    this.good = "Created Account";
  }

  testerButton2(){
    //this.auth.createAccount(this.email,this.password)
    this.auth.loginWithEmail(this.email, this.password);
    this.good = "Logged in";
  }

}
