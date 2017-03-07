import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpApi} from "../../providers/http-api";
import {SinglePage} from "../single/single";
import {GroupPage} from "../group/group";

/*
 Generated class for the Browse page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-browse',
  templateUrl: 'browse.html'
})
export class BrowsePage {

  api_url: string = 'https://dao-api.othnet.ga/uploads/';

  private courses_posts: string = "posts";
  private tag: string = "php";

  private contentList;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpApi: HttpApi) {
    this.courses_posts = this.navParams.get("type");
    this.tag = this.navParams.get("tag");
    if (this.courses_posts == "courses") {
      this.httpApi.getNewGroupsByTag(this.tag, 10).subscribe(response => {
        this.contentList = response;
        console.log("Got groups by: " + this.tag + " content: " + response);
      })
    } else if (this.courses_posts == "posts") {
      this.httpApi.getNewPostsByTag(this.tag, 10).subscribe(response => {
        this.contentList = response;
        console.log("Got posts by: " + this.tag + " content: " + response);
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrowsePage');
  }

  itemTapped(event, id) {
    // That's right, we're pushing to ourselves!
    if (this.courses_posts == 'posts') {
      this.navCtrl.push(SinglePage, {
        id: id
      });
    } else if ( this.courses_posts == 'courses' ) {
      this.navCtrl.push(GroupPage, {
        id: id
      })
    }
  }

}
