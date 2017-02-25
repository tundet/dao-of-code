import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpApi} from "../../providers/http-api";
import {SinglePage} from "../single/single";

/*
  Generated class for the Group page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-group',
  templateUrl: 'group.html'
})
export class GroupPage {

  private groupInfo;
  private groupMedia;
  private userInfo;
  private firstMedia;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpApi: HttpApi) {
    // Get group info
    this.httpApi.get(`groups/5`).subscribe(response => {
      this.groupInfo = response;
      this.httpApi.get(`groups/5/media`).subscribe(response => {
        this.groupMedia = response;
        console.log(this.groupMedia);
      });
      this.httpApi.getUserName(this.groupInfo.user_id).subscribe(response => {
        this.userInfo = response;
      });
    })
  }

  itemTapped(event, id) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(SinglePage, {
      id: id
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupPage');
  }

}
