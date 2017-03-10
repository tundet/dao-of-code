import { Component } from '@angular/core';
import { HttpApi } from "../../providers/http-api";
import {NavParams, NavController} from "ionic-angular";

/**
 * An element that contains a button that allows users to mark media as their favorites.
 */
@Component({
  selector: 'favorite-box',
  templateUrl: 'favorite-box.html'
})
export class FavoriteBoxComponent {

  private mediumId: number;
  private userId: string;
  private favoriteId: number;

  private mediumHasBeenFavorited: boolean;
  private mediumHasBeenUnfavorited: boolean;

  private mediumType: string;

  /**
   * FavoriteBoxComponent constructor.
   *
   * Make a GET request to get a list of users who have added the opened medium to their favorites.
   * Set initial state for the button based on whether the current user has
   * added the medium to their favorites.
   *
   * @param httpApi Injected HttpApi service
   * @param navParams Injected NavParams
   * @param navCtrl Injected NavController
   */
  constructor(private httpApi: HttpApi, public navParams: NavParams, public navCtrl: NavController) {
    this.mediumHasBeenFavorited = false;
    this.mediumHasBeenUnfavorited = false;

    this.userId = localStorage.getItem('dao_user_id');
    this.mediumId = this.navParams.get('id');

    console.log('ID: ' + this.mediumId);

    if (this.navCtrl.getActive().name === 'GroupPage') {
      this.mediumType = 'group';
    } else {
      this.mediumType = 'medium';
    }

    if (this.mediumType === 'medium') {
      this.httpApi.get(`media/${this.mediumId}/favorites`).subscribe(response => {
        console.log('Favorites: ' + JSON.stringify(response));
        for (let favorite in response) {
          if (response.hasOwnProperty(favorite)) {
            if (response[favorite]['user_id'] == this.userId) {
              this.mediumHasBeenFavorited = true;
              this.favoriteId = response[favorite]['id'];

              break;
            }
          }
        }
      });
    } else {
      this.httpApi.get(`groups/${this.mediumId}/favorites`).subscribe(response => {
        console.log('Favorites: ' + JSON.stringify(response));
        for (let favorite in response) {
          if (response.hasOwnProperty(favorite)) {
            if (response[favorite]['user_id'] == this.userId) {
              this.mediumHasBeenFavorited = true;
              this.favoriteId = response[favorite]['id'];

              break;
            }
          }
        }
      });
    }
  }

  /**
   * Add a favorite.
   *
   * Add a medium to the user's favorites and change the state of
   * the favorite button to show an unfavorite button instead.
   */
  favorite() {
    if (this.mediumHasBeenFavorited || this.mediumHasBeenUnfavorited) {
      this.removeFavorite();
    }

    if (this.mediumType === 'medium') {
      this.httpApi.post("favorites", { medium_id: this.mediumId }).subscribe(response => {
        this.favoriteId = response.id;
        this.mediumHasBeenFavorited = true;
      });
    } else {
      this.httpApi.post("favorites", { group_id: this.mediumId }).subscribe(response => {
        this.favoriteId = response.id;
        this.mediumHasBeenFavorited = true;
      });
    }
  }

  /**
   * Remove a favorite.
   *
   * Remove a medium from the user's favorites and change the state
   * of the unfavorite button to show a favorite button instead.
   */
  removeFavorite() {
    this.httpApi.delete(`favorites/${this.favoriteId}`).subscribe(() => {
      this.mediumHasBeenFavorited = false;
    });
  }
}
