import { Component, OnInit } from '@angular/core';
import {HttpapiService} from "../httpapi.service";

@Component({
  selector: 'app-dev2',
  templateUrl: './dev2.component.html',
  styleUrls: ['dev2.component.scss']
})
export class Dev2Component implements OnInit {

  private id: any = 1;
  private medium: any = {};
  private likes: any = [];
  private mediumOwner: string;
  private api_url: string = 'https://dao-api.othnet.ga/';

  constructor(private httpApi: HttpapiService) {
  }

  getMedia() {
    this.httpApi.get('media/'+ this.id).subscribe(response => {
      this.medium = response;
    });
  }

  getOwner() {
    this.httpApi.get('users/'+ this.id).subscribe(response => {
      this.mediumOwner = response.username;
    });
  }

  getLikes() {
    this.httpApi.get('media/'+ this.id + '/likes').subscribe(response => {
      this.likes = response;
      console.log(this.likes);
    });
  }

  ngOnInit() {
    this.getMedia();
    this.getOwner();
    this.getLikes();
  }

}
