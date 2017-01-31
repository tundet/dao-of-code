import {Component, OnInit} from '@angular/core';
import {HttpapiService} from "../httpapi.service";

@Component({
  selector: 'app-dev1',
  templateUrl: './dev1.component.html',
  styleUrls: ['dev1.component.scss']
})
export class Dev1Component implements OnInit {

  private id: any = 1;
  private image: any = {};
  private api_url: string = 'https://dao-api.othnet.ga/';

  constructor(private httpApi: HttpapiService) {
  }

  getMedia() {
    this.httpApi.get('media/'+ this.id).subscribe(response => {
      this.image = response;
      console.log(this.image);
    });
  }

  ngOnInit() {
    this.getMedia();

  }

}
