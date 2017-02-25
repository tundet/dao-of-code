import { Injectable, Pipe } from '@angular/core';

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
  private languages: any = [
    {"name": "Java", "value": "java"},
    {"name": "C", "value": "c"},
    {"name": "C++", "value": "cpp"},
    {"name": "C#", "value": "cs"},
    {"name": "Php", "value": "php"},
    {"name": "SQL", "value": "sql"},
    {"name": "HTML", "value": "html"},
    {"name": "HTML5", "value": "html5"},
    {"name": "Css", "value": "css"},
    {"name": "JavaScript", "value": "javascript"},
    {"name": "Angular", "value": "angular"},
    {"name": "React", "value": "react"}
  ];

  transform(value, args) {
    for (let lng of this.languages) {
      if (lng.value == value) {
        return lng.name;
      }
    }
  }
}
