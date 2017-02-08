import { Component, OnInit } from '@angular/core';
import {HttpapiService} from "../httpapi.service";

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss']
})
export class MediaPlayerComponent implements OnInit {

  medium;

  constructor(private http: HttpapiService) {
    this.medium = http.get('media/1');
    console.log(this.medium);
  }

  ngOnInit() {
  }

}
