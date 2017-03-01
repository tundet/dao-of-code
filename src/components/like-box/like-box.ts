import { Component } from '@angular/core';
import { HttpApi } from "../../providers/http-api";
import { NavParams } from "ionic-angular";

@Component({
  selector: 'like-box',
  templateUrl: 'like-box.html'
})
export class LikeBoxComponent {

  private mediumId: number;
  private userId: string;
  private likeId: number;

  private mediumHasBeenLiked: boolean;
  private mediumHasBeenDisliked: boolean;

  /**
   * LikeBoxComponent constructor
   *
   * @param httpApi Injected HttpApi service
   * @param navParams Injected NavParams
   */
  constructor(private httpApi: HttpApi, public navParams: NavParams) {
    this.mediumHasBeenLiked = false;
    this.mediumHasBeenDisliked = false;

    this.userId = localStorage.getItem('dao_user_id');
    this.mediumId = this.navParams.get('id');

    this.httpApi.get(`media/${this.mediumId}/likes`).subscribe(response => {
      for (let like in response) {
        if (response.hasOwnProperty(like)) {
          if (response[like]['user_id'] == this.userId) {
            if (response[like]['user_id'] == 1) {
              this.mediumHasBeenLiked = true;
            } else {
              this.mediumHasBeenDisliked = true;
            }

            this.likeId = response[like]['id'];

            break;
          }
        } else {
          // TODO: Show a toast telling the like could not be registered.
        }
      }
    });
  }

  /**
   * Like a medium.
   */
  like() {
    if (this.mediumHasBeenLiked || this.mediumHasBeenDisliked) {
      this.removeLike();
    }

    this.httpApi.post("likes", { medium_id: this.mediumId, like: 1 }).subscribe(response => {
      this.likeId = response.id;
      this.mediumHasBeenLiked = true;
    });
  }

  /**
   * Dislike a medium.
   */
  dislike() {
    if (this.mediumHasBeenLiked || this.mediumHasBeenDisliked) {
      this.removeLike();
    }

    this.httpApi.post("likes", { medium_id: this.mediumId, like: 0 }).subscribe(response => {
      this.likeId = response.id;
      this.mediumHasBeenDisliked = true;

    });
  }

  /**
   * Remove like from a medium.
   */
  removeLike() {
    this.httpApi.delete(`likes/${this.likeId}`).subscribe(() => {
      this.mediumHasBeenLiked = false;
      this.mediumHasBeenDisliked = false;
    });
  }

}
