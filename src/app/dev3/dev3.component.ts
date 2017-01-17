import { Component, OnInit } from '@angular/core';
import {HttpapiService} from "../httpapi.service";
import {Response} from "@angular/http";

@Component({
  selector: 'app-dev3',
  templateUrl: './dev3.component.html',
  styleUrls: ['./dev3.component.css']
})
export class Dev3Component implements OnInit {

  newUser = {
    username: '',
    password: '',
    email:''
  };

  private onSignup() {
    console.log("Singup! start");
    var response = this.httpApi.post("users", this.newUser);
    console.log(response);
    console.log("Singup! end");
  }


  constructor( private httpApi: HttpapiService ) { }

  ngOnInit() {
  }

}
