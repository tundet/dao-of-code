import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpApi} from "../../providers/http-api";
import {SinglePage} from "../single/single";
import {global} from "../../app/global";
import {Page2} from "../page2/page2";

/*
 Generated class for the Search page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  private searchinput;
  private languages = global.languages;
  private tag: string = "java";
  private title: boolean = true;
  private description: boolean = true;

  api_url: string = 'https://dao-api.othnet.ga/uploads/';

  private contentList;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpApi: HttpApi) {
    this.httpApi.getNew(15).subscribe(response => {
      this.contentList = response;
      console.log(response);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  /**
   * Get content that user wants to search for
   * @param event
   */
  getContent(event) {
    this.contentList = [];
    console.log(this.tag);
    if (this.title == true) {
      this.searchinput = event.target.value;
      this.searchinput = this.searchinput.toLowerCase();
      console.log(this.searchinput);
      this.httpApi.searchTitle(this.searchinput, this.tag).subscribe(response => {
        this.contentList = response;
        console.log(response);
      })
    } else if (this.description == true) {
      this.httpApi.searchDescription(this.searchinput, this.tag).subscribe(response => {
        this.contentList.append = response;
        console.log(response);
      })
    }
  }

  /**
   * Language icon is tapped, redirects to posts or courses, using this.courses_posts value
   *
   * @param event
   * @param value value corresponding to icons tag
   */
  itemTapped(event, id) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(SinglePage, {
      id: id
    });
  }

  /**
   * Changes view and root to home
   */
  toHome() {
    this.navCtrl.setRoot(Page2);
  }
}
