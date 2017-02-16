import {Component, ViewChild} from '@angular/core';
import {SinglePage} from '../single/single'
import {NavController, NavParams, Slides} from 'ionic-angular';
import {HttpApi} from "../../providers/http-api";

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  @ViewChild(Slides) slides: Slides;
  selectedItem: any;
  private newPics = [];
  api_url: string = 'https://dao-api.othnet.ga/uploads/';

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpApi: HttpApi) {

  }

  ngOnInit() {
    //console.log("listing images");
    this.httpApi.getNew(10).subscribe(
      resp => {
        //console.log(resp.json());
        this.newPics = resp.json();
      },
      error => {
        console.log(error);
      }
    );
  }

  itemTapped(event, id) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(SinglePage, {
      id: id
    });
  }

  goToSlide() {
    this.slides.slideTo(2, 500);
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log("Current index is", currentIndex);
  }
}
