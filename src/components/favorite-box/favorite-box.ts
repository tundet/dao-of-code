import { Component } from '@angular/core';
import {HttpApi} from "../../providers/http-api";
import {NavParams} from "ionic-angular";

/*
  Generated class for the FavoriteBox component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
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

  /**
   * FavoriteBoxComponent constructor
   *
   * @param httpApi Injected HttpApi service
   * @param navParams Injected NavParams
   */
  constructor(private httpApi: HttpApi, public navParams: NavParams) {
    this.mediumHasBeenFavorited = false;
    this.mediumHasBeenUnfavorited = false;

    this.userId = localStorage.getItem('dao_user_id');
    this.mediumId = this.navParams.get('id');

    this.httpApi.get(`media/${this.mediumId}/favorites`).subscribe(response => {
      console.log('Favorites: ' + JSON.stringify(response));
      for (let favorite in response) {
        if (response.hasOwnProperty(favorite)) {
          if (response[favorite]['user_id'] == this.userId) {
            this.mediumHasBeenFavorited = true;
            this.favoriteId = response[favorite]['id'];

            break;
          }
        } else {
          // TODO: Show a toast telling the favorite could not be registered.
        }
      }
    });
  }

  /**
   * Favorite a medium.
   */
  favorite() {
    if (this.mediumHasBeenFavorited || this.mediumHasBeenUnfavorited) {
      this.removeFavorite();
    }

    this.httpApi.post("favorites", { medium_id: this.mediumId }).subscribe(response => {
      this.favoriteId = response.id;
      this.mediumHasBeenFavorited = true;
    });
  }

  /**
   * Remove favorite from a medium.
   */
  removeFavorite() {
    this.httpApi.delete(`favorites/${this.favoriteId}`).subscribe(() => {
      this.mediumHasBeenFavorited = false;
    });
  }

}
