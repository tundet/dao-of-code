import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpApi} from "../../providers/http-api";
import {SinglePage} from "../single/single";
import {GroupPage} from "../group/group";

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

  itemTapped(event, id) {
    // That's right, we're pushing to ourselves!
      this.navCtrl.push(SinglePage, {
        id: id
      });
  }
}
