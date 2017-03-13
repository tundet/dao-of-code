import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpApi} from "../../providers/http-api";
import {Page2} from "../page2/page2";

/*
  Generated class for the About page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  private statisticUsers;
  private statisticFav;
  private statisticCourses;
  private statisticPosts;
  private statisticComments;

  private lmgtfysearch = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpApi: HttpApi) {
    this.httpApi.get('users').subscribe(response => {
      this.statisticUsers = response.length;
    });
    this.httpApi.get('favorites').subscribe(response => {
      this.statisticFav = response.length;
    });
    this.httpApi.get('groups').subscribe(response => {
      this.statisticCourses = response.length;
    });
    this.httpApi.get('media').subscribe(response => {
      this.statisticPosts = response.length;
    });
    this.httpApi.get('comments').subscribe(response => {
      this.statisticComments = response.length;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  /**
   * Changes view and root to home
   */
  toHome() {
    this.navCtrl.setRoot(Page2);
  }

}
