import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpApi} from "../../providers/http-api";

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

  private comments;
  private txtcomment: string = '';
  private commentInfo = {
    medium_id: "",
    comment: ""
  };
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

    this.httpApi.get(`media/${id}/comments`).subscribe(response => {
      this.comments = response;
      console.log(this.comments);
    });
  }

  comment(event: any) {
    this.commentInfo = {
      medium_id: this.mediaInfo.id,
      comment: this.txtcomment
    };
    console.log(this.commentInfo);
    this.httpApi.post("comments", this.commentInfo).subscribe(response => {
      console.log(response);
    });
    console.log(this.comments);
    this.txtcomment = "";
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SinglePage');

  }

}
