import { Injectable, Pipe } from '@angular/core';
import {HttpApi} from "../providers/http-api";

/*
  Get username of the given user ID.
*/
@Pipe({
  name: 'get-username'
})
@Injectable()
export class GetUsername {

  constructor(private httpApi: HttpApi) {}

  transform(value: any, args?: any): any {
    this.httpApi.get('users/' + value).subscribe(response => {
      return response.username;
    });
  }
}
