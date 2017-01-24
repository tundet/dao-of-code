import { Component, OnInit } from '@angular/core';
import {HttpapiService} from "../httpapi.service";

@Component({
  selector: 'app-dev3',
  templateUrl: './dev3.component.html',
  styleUrls: ['dev3.component.scss']
})
export class Dev3Component implements OnInit {

  TODO: boolean = false;

  getValue = {
    value: ''
  };

  gotUser = {
    id: '',
    username: '',
    email: '',
    created_at: ''
  };

  userMedias = null;

  onGetUser() {
    console.log("onGetUser! start");
    this.resetJson(this.gotUser);
    this.httpApi.get("users/" + this.getValue.value).subscribe(response => {
      console.log(response);
      this.gotUser.id = response.id;
      this.gotUser.username = response.username;
      this.gotUser.email = response.email;
      this.gotUser.created_at = response.created_at;
      this.getUserMedia();
    });
    console.log("onGetUser! end");
  }

  getUserMedia() {
    console.log(this.gotUser);
    this.httpApi.get(`users/${this.gotUser.username}/media`).subscribe(response => {
      this.userMedias = response;
    });
  }

  private resetJson (json){
    for (let i in json) {
      json[i] = '';
    }
  }

  constructor(private httpApi: HttpapiService) { }

  ngOnInit() {
  }

}
