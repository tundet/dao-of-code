import { Component, OnInit } from '@angular/core';
import {HttpapiService} from "../httpapi.service";

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
    this.httpApi.post("users", this.newUser).do((res: any) => console.log(res));
  }


  constructor(
    private httpApi: HttpapiService
  ) { }

  ngOnInit() {
  }

}
