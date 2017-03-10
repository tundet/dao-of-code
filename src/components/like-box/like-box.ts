import {Component} from '@angular/core';
import {HttpApi} from "../../providers/http-api";
import {NavParams} from "ionic-angular";
import {NavController} from 'ionic-angular';

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
  private likes;
  private likescount = 0;
  private dislikescount = 0;
  private path: string = "media";

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
  constructor(private httpApi: HttpApi, public navParams: NavParams, public navCtrl: NavController) {
    this.mediumHasBeenLiked = false;
    this.mediumHasBeenDisliked = false;

    this.userId = localStorage.getItem('dao_user_id');
    this.mediumId = this.navParams.get('id');

    if (this.navCtrl.getActive().name == "GroupPage") {
      this.path = "groups";
    }
    this.getLikes();
  }

  getLikes() {

    this.likes = '';
    this.likescount = 0;
    this.dislikescount = 0;

    this.httpApi.get(`${this.path}/${this.mediumId}/likes`).subscribe(response => {
      this.likes = response;
      console.log(this.likes);

      for (let like of this.likes) {
        if (like.like == "1") {
          this.likescount++;
        } else {
          this.dislikescount++;
        }
      }

      for (let like in this.likes) {
        if (response.hasOwnProperty(like)) {
          if (response[like]['user_id'] == this.userId) {
            if (response[like]['like'] == 1) {
              this.mediumHasBeenLiked = true;
            } else if (response[like]['like'] == 0) {
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
    if (this.mediumHasBeenDisliked) {
      this.removeLike(1);
    } else {
      this.httpApi.post("likes", {medium_id: this.mediumId, like: 1}).subscribe(response => {
        this.likeId = response.id;
        this.mediumHasBeenLiked = true;
        this.mediumHasBeenDisliked = false;
        this.getLikes();
      });
    }
  }

  /**
   * Dislike a medium.
   *
   * Add a medium to the user's dislikes and change the state of
   * the dislike button to show a like button instead.
   */
  dislike() {
    if (this.mediumHasBeenLiked) {
      this.removeLike(0);
    } else {
      this.httpApi.post("likes", {medium_id: this.mediumId, like: 0}).subscribe(response => {
        this.likeId = response.id;
        this.mediumHasBeenDisliked = true;
        this.mediumHasBeenLiked = false;
        this.getLikes();

      });
    }
  }

  /**
   * Remove a like from a medium.
   */
  removeLike(type: number = 2) {
    if (type == 2){
      this.httpApi.delete(`likes/${this.likeId}`).subscribe(() => {
        this.mediumHasBeenLiked = false;
        this.mediumHasBeenDisliked = false;
        this.getLikes();
      });
    } else if (type == 1) {
      this.httpApi.delete(`likes/${this.likeId}`).subscribe(() => {
        this.httpApi.post("likes", {medium_id: this.mediumId, like: 1}).subscribe(response => {
          this.likeId = response.id;
          this.mediumHasBeenLiked = true;
          this.mediumHasBeenDisliked = false;
          this.getLikes();
        });
      });
    } else if (type == 0) {
      this.httpApi.delete(`likes/${this.likeId}`).subscribe(() => {
        this.httpApi.post("likes", {medium_id: this.mediumId, like: 0}).subscribe(response => {
          this.likeId = response.id;
          this.mediumHasBeenDisliked = true;
          this.mediumHasBeenLiked = false;
          this.getLikes();
        });
      });
    }
  }
}
