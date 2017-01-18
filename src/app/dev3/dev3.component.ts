import { Component, OnInit } from '@angular/core';
import {HttpapiService} from "../httpapi.service";

@Component({
  selector: 'app-dev3',
  templateUrl: './dev3.component.html',
  styleUrls: ['./dev3.component.css']
})
export class Dev3Component implements OnInit {

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

  changeMode() {
    if (this.signInMode === true) {
      this.signInMode = false;
      this.linkText = 'Already have an account?'
    } else {
      this.signInMode = true;
      this.linkText = 'Don\'t have an account?';
    }
  }

  private onSignup() {
    console.log("Singup! start");
    this.httpApi.post("users", this.newUser).subscribe(response => {
      console.log(response);
    });
    console.log("Singup! end");
  }

  private onSignin() {
    console.log("Singin! start");
    this.httpApi.post("login", this.signinUser).subscribe(response => {
      console.log(response);
    });
    console.log("Singin! end");
  }


  constructor( private httpApi: HttpapiService ) { }

  ngOnInit() {
  }

}
