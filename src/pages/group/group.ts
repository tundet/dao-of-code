import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
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

  api_url: string = 'https://dao-api.othnet.ga/uploads/';

  private groupInfo;
  private groupMedia;
  private userInfo;
  private firstMedia;
  private edited: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpApi: HttpApi) {
    // Get group info
    this.httpApi.get(`groups/4`).subscribe(response => {
      this.groupInfo = response;
      this.httpApi.get(`groups/4/media`).subscribe(response => {
        this.groupMedia = response;
        console.log(this.groupMedia);
      });
      this.httpApi.getUserName(this.groupInfo.user_id).subscribe(response => {
        this.userInfo = response;
      });
    })
  }

  upArrowPressed(index: number) {
    this.edited = true;
    let newList = [];

    // ok
    if (index > 1) {
      for (let i = 0; i < index - 1; i++) {
        this.groupMedia[i].group_priority = i;
        newList.push(this.groupMedia[i]);
      }
    }

    this.groupMedia[index].group_priority = index -1;
    newList.push(this.groupMedia[index]);
    this.groupMedia[index-1].group_priority = index;
    newList.push(this.groupMedia[index -1]);

    if (index < this.groupMedia.length) {
      for (let i = index + 1; i < this.groupMedia.length; i++) {
        this.groupMedia[i].group_priority = i;
        newList.push(this.groupMedia[i]);
      }
    }
    this.groupMedia = newList;
  }

  downArrowPressed(index: number) {
    this.edited = true;
    let newList = [];

    // ok
    if (index >= 1) {
      for (let i = 0; i < index; i++) {
        this.groupMedia[i].group_priority = i;
        console.log(JSON.stringify(this.groupMedia[i]));
        newList.push(this.groupMedia[i]);
      }
    }

    this.groupMedia[index + 1].group_priority = index;
    newList.push(this.groupMedia[index + 1]);
    this.groupMedia[index].group_priority = index +1;
    newList.push(this.groupMedia[index]);

    if (index + 2 < this.groupMedia.length) {
      for (let i = index + 2; i < this.groupMedia.length; i++) {
        this.groupMedia[i].group_priority = i;
        newList.push(this.groupMedia[i]);
      }
    }
    this.groupMedia = newList;
  }

  saveMediaOrder() {
    for (let media of this.groupMedia) {
      this.httpApi.patch(`/media/${media.id}`, media).subscribe(response => {
        console.log("media " + media.id + " updated! " + response);
      });
    }
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
