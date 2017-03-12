import {Component, ViewChild} from '@angular/core';
import {SinglePage} from '../single/single'
import {NavController, NavParams, Slides} from 'ionic-angular';
import {HttpApi} from "../../providers/http-api";
import {global} from "../../app/global";
import {BrowsePage} from "../browse/browse";
import {SearchPage} from "../search/search";
import {ProfilePage} from "../profile/profile";

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  @ViewChild(Slides) slides: Slides;
  private invisibleArrowColor = 'white';
  selectedItem: any;
  private courses_posts = "courses";
  private featured = [];
  private featuredUsers = [];
  api_url: string = 'https://dao-api.othnet.ga/uploads/';
  private languages = global.languages;
  private shownLanguageList = [];
  private searchbar: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpApi: HttpApi) {
    let a = [];
    for (let i = 0; i < this.languages.length; i++) {
      a.push(this.languages[i]);
      if (i % 2 == 1) {
        this.shownLanguageList.push(a);
        a = [];
      }
    }
  }

  // (replaces ngIn..) loads new data when ever or how ever view is getting here
  ionViewWillEnter() {
    this.refresh();
  }

  /**
   * Get featured content
   */
  refresh(refresher = null) {
    this.featured = [];
    this.featuredUsers = [];
    this.httpApi.get(`users/1/favorites`).subscribe(response => {
        for (let medium of response) {
          this.httpApi.get(`media/` + medium.medium_id).subscribe(response2 => {
            this.featured.push(response2);
            if (response[response.length - 1] == medium) {
              this.httpApi.getUserNames(this.featured).subscribe(response3 => {
                this.featuredUsers = response3;
                console.log(this.featuredUsers);
              });
            }
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
   * Language icon is tapped, redirects to posts or courses, using this.courses_posts value
   *
   * @param event
   * @param value value corresponding to icons tag
   */
  langTapped(event, value) {
    // That's right, we're pushing to ourselves!
    if (this.courses_posts == "courses") {
      this.navCtrl.push(BrowsePage, {
        type: "courses",
        tag: value
      });
    } else if (this.courses_posts == "posts") {
      this.navCtrl.push(BrowsePage, {
        type: "posts",
        tag: value
      });
    }
  }

  /**
   * Changes view and root to target
   */
  toHome() {
    this.navCtrl.setRoot(Page2);
  }

  toSearch() {
    this.navCtrl.setRoot(SearchPage);
  }

  toProfile(){
    this.navCtrl.setRoot(ProfilePage);
  }

  /**
   * Shows tapped featured items page
   *
   * @param event
   * @param id of tapped featured item
   */
  itemTapped(event, id) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(SinglePage, {
      id: id
    });
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
}
