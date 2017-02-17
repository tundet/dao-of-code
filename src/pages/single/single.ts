import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpApi} from "../../providers/http-api";
import {GetUsername} from "../../pipes/get-username";

/*
  Generated class for the Single page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-single',
  templateUrl: 'single.html',
})
export class SinglePage {

  private mediaInfo;
  private textMediaContent;
  private username;
  api_url: string = 'https://dao-api.othnet.ga/uploads/original/';

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpApi: HttpApi) {
    let id = this.navParams.get('id');
    console.log(id);
    this.httpApi.get(`media/${id}`).subscribe(response => {
      this.mediaInfo = response;
      console.log(this.mediaInfo);
      if (this.mediaInfo.media_type == "text") {
        this.httpApi.getText(this.mediaInfo.file_name).subscribe(response => {
          this.textMediaContent = response.text();
          console.log(response.text());
        })
      }
      this.httpApi.getUserName(this.mediaInfo.user_id).subscribe(response => {
        this.username = response.json().username;
      })
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SinglePage');
  }

}
