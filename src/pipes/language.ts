import { Injectable, Pipe } from '@angular/core';
import { global } from '../app/global';

/*
  Generated class for the Language pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'language'
})
@Injectable()
export class Language {
  /*
    Takes a value and makes it lowercase.
   */
  private languages = global.languages;

  transform(value, args) {
    for (let lng of this.languages) {
      if (lng.value == value) {
        return lng.name;
      }
    }
  }
}
