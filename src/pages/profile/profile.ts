import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpApi } from "../../providers/http-api";
import { SinglePage } from "../single/single";
import { GroupPage } from "../group/group";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  readonly BASE_URL: string = 'https://dao-api.othnet.ga/uploads/';

  private id: number;
  private user: any = {};
  private media: any;
  private groups: any;
  private mediaAreVisible: boolean;
  private groupsAreVisible: boolean;

  /**
   * Profile page constructor.
   *
   * @param navCtrl
   * @param navParams
   * @param httpApi
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpApi: HttpApi) {
    this.id = this.navParams.get('id') ? this.navParams.get('id') : localStorage.getItem('dao_user_id');

    this.httpApi.get(`users/${this.id}`).subscribe(response => {
      this.user = response;
    });

    this.httpApi.get(`users/${this.id}/media`).subscribe(response => {
      this.media = response;
      console.log('Media: ' + JSON.stringify(this.media));
    });

    this.httpApi.get(`users/${this.id}/groups`).subscribe(response => {
      this.groups = response;
      console.log('Groups: ' + JSON.stringify(this.groups));
    });

    this.mediaAreVisible = true;
    this.groupsAreVisible = false;
  }

  showMedia() {
    this.mediaAreVisible = true;
    this.groupsAreVisible = false;
  }

  showGroups() {
    this.groupsAreVisible = true;
    this.mediaAreVisible = false;
  }


  showMedium(event, id) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(SinglePage, {
      id: id
    });
  }

  showGroup(event, id) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(GroupPage, {
      id: id
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
