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

  constructor(private httpApi: HttpApi, public navParams: NavParams) {
    this.mediumHasBeenLiked = false;
    this.mediumHasBeenDisliked;

    this.userId = localStorage.getItem('dao_user_id');
    this.mediumId = this.navParams.get('id');

    this.httpApi.get(`media/${this.mediumId}/likes`).subscribe(response => {
      for (var like in response) {
        console.log('user id: ' + this.userId);
        console.log('user id of like: ' + response[like]['user_id']);

        if (response[like]['user_id'] == this.userId) {
          if (response[like]['user_id'] == 1) {
            this.mediumHasBeenLiked = true;
          } else {
            this.mediumHasBeenDisliked = true;
          }

          this.likeId = response[like]['id'];

          console.log('medium has been liked');

          break;
        }

        console.log('medium has not been liked');
      }
    });

    console.log('medium has been liked: ' + this.mediumHasBeenLiked);
  }

  like() {
    console.log('liked');

    if (this.mediumHasBeenLiked || this.mediumHasBeenDisliked) {
      this.removeLike();
    }

    this.httpApi.post("likes", { medium_id: this.mediumId, like: 1 }).subscribe(response => {
      console.log(response);

      this.likeId = response.id;
      this.mediumHasBeenLiked = true;
    });
  }

  dislike() {
    if (this.mediumHasBeenLiked || this.mediumHasBeenDisliked) {
      this.removeLike();
    }

    this.httpApi.post("likes", { medium_id: this.mediumId, like: 0 }).subscribe(response => {
      console.log(response);

      this.likeId = response.id;
      this.mediumHasBeenDisliked = true;

    });
  }

  removeLike() {
    this.httpApi.delete(`likes/${this.likeId}`).subscribe(response => {
      console.log(response);

      this.mediumHasBeenLiked = false;
      this.mediumHasBeenDisliked = false;
    });
  }

}
