import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import { HttpApi } from "../../providers/http-api";
import { SinglePage } from "../single/single";
import { GroupPage } from "../group/group";
import {Page2} from "../page2/page2";

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
  private favoriteMedia: any = [];
  private favoriteGroups: any = [];
  private mediaAreVisible: boolean;
  private groupsAreVisible: boolean;
  private favoritesAreVisible: boolean;

  /**
   * Profile page constructor.
   *
   * @param navCtrl
   * @param navParams
   * @param httpApi
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpApi: HttpApi,viewCtrl: ViewController) {
    this.id = this.navParams.get('id') ? this.navParams.get('id') : localStorage.getItem('dao_user_id');

    this.httpApi.get(`users/${this.id}`).subscribe(response => {
      this.user = response;
    });

    this.refresh();
  }

  refresh(){
    this.media = [];
    this.groups = [];
    this.favoriteMedia = [];
    this.favoriteGroups = [];

    this.httpApi.get(`users/${this.id}/media`).subscribe(response => {
      this.media = response;
    });

    this.httpApi.get(`users/${this.id}/groups`).subscribe(response => {
      this.groups = response;
    });

    this.httpApi.get(`users/${this.id}/favorites`).subscribe(response => {
      if (response instanceof Array) {
        for (let favorite in response) {
          if (response.hasOwnProperty(favorite)) {
            if (response[favorite].hasOwnProperty('medium_id') && response[favorite]['medium_id'] !== null) {
              this.httpApi.get(`media/${response[favorite]['medium_id']}`).subscribe(response => {
                this.favoriteMedia.push(response);
              });
            } else if (response[favorite].hasOwnProperty('group_id') && response[favorite]['group_id'] !== null) {
              this.httpApi.get(`groups/${response[favorite]['group_id']}`).subscribe(response => {
                this.favoriteGroups.push(response);
              });
            }
          }
        }
      }
    });

    this.mediaAreVisible = true;
  }

  /**
   * Show the media the user has uploaded.
   */
  showMedia() {
    this.mediaAreVisible = true;
    this.groupsAreVisible = false;
    this.favoritesAreVisible = false;
  }

  /**
   * Show the groups the user has created.
   */
  showGroups() {
    this.mediaAreVisible = false;
    this.groupsAreVisible = true;
    this.favoritesAreVisible = false;
  }

  /**
   * Show the media and groups the user has added to their favorites.
   */
  showFavorites() {
    this.mediaAreVisible = false;
    this.groupsAreVisible = false;
    this.favoritesAreVisible = true;
  }


  /**
   * Show a medium.
   *
   * @param event
   * @param id
   */
  showMedium(event, id) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(SinglePage, {
      id: id
    });
  }

  /**
   * Delete a medium
   *
   * @param id of medium
   */
  deleteMedium(id: string) {
    this.httpApi.delete(`media/` + id).subscribe(response => {
      console.log(response);
      this.refresh();
    });
  }

  /**
   * Delete a group
   *
   * @param id of group
   */
  deleteGroup(id) {
    this.httpApi.delete(`groups/` + id).subscribe(response => {
    console.log(response);
    this.refresh()
  });
  }

  /**
   * Delete a favorite
   *
   * @param id of group
   */
  deleteFavorite(id) {
    this.httpApi.delete(`favorites/` + id).subscribe(response => {
      console.log(response);
      this.refresh()
    });
  }

  /**
   * Show a group.
   *
   * @param event
   * @param id
   */
  showGroup(event, id) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(GroupPage, {
      id: id
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  toHome() {
    this.navCtrl.setRoot(Page2);
  }

}
