import { Component } from '@angular/core';
import { HttpApi } from "../../providers/http-api";
import { NavParams } from "ionic-angular";

/**
 * An element that contains buttons that allows users to like or dislike media.
 */
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
   * LikeBoxComponent constructor.
   *
   * Make a GET request to get a list of likes and dislikes for the opened medium.
   * Set initial states for the buttons based on whether the current user has
   * liked the medium that is displayed on the page.
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
   *
   * Add a medium to the user's dislikes and change the state of
   * the like button to show a dislike button instead.
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
   *
   * Add a medium to the user's dislikes and change the state of
   * the dislike button to show a like button instead.
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
   * Remove a like from a medium.
   */
  removeLike() {
    this.httpApi.delete(`likes/${this.likeId}`).subscribe(() => {
      this.mediumHasBeenLiked = false;
      this.mediumHasBeenDisliked = false;
    });
  }
}
