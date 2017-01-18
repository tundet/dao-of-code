import { Component, OnInit } from '@angular/core';
import {HttpapiService} from "../httpapi.service";

@Component({
  selector: 'app-dev3',
  templateUrl: './dev3.component.html',
  styleUrls: ['./dev3.component.css']
})
export class Dev3Component implements OnInit {

  loggedinMode: boolean = false;
  newUserHasBeenMade: boolean = false;
  signInMode: boolean = true;
  linkText: string = 'Don\'t have an account?';

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

  private onSignup() {
    console.log("Singup! start");
    this.httpApi.post("users", this.newUser).subscribe(response => {
      console.log(response);
      this.newUserHasBeenMade = true;
      this.signInMode = true;
    });
    console.log("Singup! end");
  }

  private onSignin() {
    console.log("Singin! start");
    this.httpApi.post("login", this.signinUser).subscribe(response => {
      console.log(response);
      this.loggedinUser.username = this.signinUser.username;
      this.loggedinUser.token = response.token;
      this.loggedinMode = true;
      this.resetJson(this.signinUser);
    });
    console.log("Singin! end");
  }


  constructor( private httpApi: HttpapiService ) { }

  ngOnInit() {
  }

}
