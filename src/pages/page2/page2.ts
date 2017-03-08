import {Component, ViewChild} from '@angular/core';
import {SinglePage} from '../single/single'
import {NavController, NavParams, Slides} from 'ionic-angular';
import {HttpApi} from "../../providers/http-api";
import {global} from "../../app/global";
import {BrowsePage} from "../browse/browse";

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
  api_url: string = 'https://dao-api.othnet.ga/uploads/';
  private languages = global.languages;
  private shownLanguageList = [];

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

  refresh(refresher = null) {
    this.featured = [];
    this.httpApi.get(`users/1/favorites`).subscribe(response => {
      for (let medium of response) {
        this.httpApi.get(`media/` + medium.medium_id).subscribe(response2 => {
          this.featured.push(response2);
        })
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

  itemTapped(event, id) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(SinglePage, {
      id: id
    });
  }

  changeSlide(direction: boolean) {
    let currentIndex = this.slides.getActiveIndex();
    if (direction) {
      this.slides.slideTo(currentIndex +1);
    }
    if (!direction) {
      this.slides.slideTo(currentIndex -1);
    }
    console.log(currentIndex);
  }
}
