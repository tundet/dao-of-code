import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Slides} from 'ionic-angular';
import {HttpApi} from "../../providers/http-api";
import {SinglePage} from "../single/single";
import {GroupPage} from "../group/group";
import {isNumber} from "util";
import {Page2} from "../page2/page2";

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

  @ViewChild(Slides) slides: Slides;
  private featured = [];

  private courses_posts: string = "posts";
  private tag: string = "php";

  private contentList;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpApi: HttpApi) {
    this.courses_posts = this.navParams.get("type");
    this.tag = this.navParams.get("tag");
    this.refresh();
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

  /**
   * Get featured content
   */
  refresh(refresher = null) {
    this.featured = [];
    this.httpApi.get(`users/1/favorites/` + this.tag).subscribe(response => {
        for (let medium of response) {
          this.httpApi.get(`media/` + medium.medium_id).subscribe(response2 => {
            this.featured.push(response2);
          });
        }
        if (refresher) {
          refresher.complete();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * Changes slide based on button click
   *
   * @param direction index number of featured list or boolean for slide direction
   */
  changeSlide(direction: any) {
    let currentIndex = this.slides.getActiveIndex();
    if (typeof(direction) === "number") {
      this.slides.slideTo(direction);
    }
    if (typeof(direction) === "boolean") {
      if (direction) {
        this.slides.slideTo(currentIndex + 1);
      }
      if (!direction) {
        this.slides.slideTo(currentIndex - 1);
      }
    }
    console.log(currentIndex);
  }

  /**
   * Shows tapped featured items page
   *
   * @param event
   * @param id of tapped featured item
   */
  itemTapped(event, id) {
    // That's right, we're pushing to ourselves!
    if (this.courses_posts == 'posts') {
      this.navCtrl.push(SinglePage, {
        id: id
      });
    } else if (this.courses_posts == 'courses') {
      this.navCtrl.push(GroupPage, {
        id: id
      });
    }
  }

  /**
   * Changes view and root to home
   */
  toHome() {
    this.navCtrl.setRoot(Page2);
  }

}
