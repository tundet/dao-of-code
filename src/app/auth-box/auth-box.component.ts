import { Component, OnInit } from '@angular/core';
import {HttpapiService} from "../httpapi.service";

@Component({
  selector: 'app-auth-box',
  templateUrl: './auth-box.component.html',
  styleUrls: ['./auth-box.component.css']
})
export class AuthBoxComponent implements OnInit {

  loggedinMode: boolean = false;
  newUserHasBeenMade: boolean = false;
  signInMode: boolean = true;
  linkText: string = 'Don\'t have an account?';

  JWT_KEY: string = 'dao_jwt';

  newUser = {
    username: '',
    password: '',
    email:''
  };

  signinUser = {
    username: '',
    password: ''
  };

  loggedinUser =  {
    username: '',
    token: ''
  };

  private resetJson (json){
    for (var i in json) {
      json[i] = '';
    }
  }

  private resetAllJsons () {
    this.resetJson(this.newUser);
    this.resetJson(this.loggedinUser);
    this.resetJson(this.signinUser);
  }

  changeSignupMode() {
    if (this.signInMode === true) {
      this.signInMode = false;
      this.newUserHasBeenMade = false;
      this.linkText = 'Already have an account?'
      this.resetAllJsons();
    } else {
      this.signInMode = true;
      this.newUserHasBeenMade = false;
      this.linkText = 'Don\'t have an account?';
      this.resetAllJsons();
    }
  }

  onSignup() {
    console.log("Signup! start");
    this.httpApi.post("users", this.newUser).subscribe(response => {
      console.log(response);
      this.newUserHasBeenMade = true;
      this.signInMode = true;
    });
    console.log("Signup! end");
  }

  onSignin() {
    console.log("Signin! start");
    this.httpApi.post("login", this.signinUser).subscribe(response => {
      console.log(response);
      this.setJwt(response.token);
      this.loggedinUser.username = this.signinUser.username;
      this.loggedinUser.token = response.token;
      this.loggedinMode = true;
      this.resetJson(this.signinUser);
    });
    console.log("Signin! end");
  }

  signout() {
    window.localStorage.removeItem(this.JWT_KEY);
    this.resetAllJsons();
    this.loggedinMode = false;
    this.httpApi.headers.delete('Authorization');
    console.log(this.httpApi.headers.toJSON());
    console.log("Signout end!");
  }

  constructor( private httpApi: HttpapiService ) {
    const token = window.localStorage.getItem(this.JWT_KEY);
    if (token) {
      this.setJwt(token);
      this.loggedinMode = true;
    }
  }

  setJwt(jwt: string) {
    window.localStorage.setItem(this.JWT_KEY, jwt);
    this.httpApi.setHeaders({'Authorization': `Bearer ${jwt}`});
  }

  ngOnInit() {
  }

}
