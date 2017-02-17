import { Component } from '@angular/core';

@Component({
  selector: 'like-box',
  templateUrl: 'like-box.html'
})
export class LikeBoxComponent {

  constructor() {
  }

  like(event) {
    console.log('liked');
  }

  dislike(event) {
    console.log('disliked');
  }

  removeLike(event) {
    console.log('like removed');
  }

}
