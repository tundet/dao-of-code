import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpApi} from "../../providers/http-api";
import { Page1 } from "../page1/page1";

/*
  Generated class for the Logout page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogoutPage {

  JWT_KEY: string = 'dao_token';
  JWT_USER: string = 'dao_user';

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpApi: HttpApi) {
    this.httpApi.logout();
    window.localStorage.removeItem(this.JWT_KEY);
    window.localStorage.removeItem(this.JWT_USER);
    this.httpApi.headers.delete('x-access-token');
    this.navCtrl.setRoot(Page1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

}
