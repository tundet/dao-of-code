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

  private username: string;

  transform(value: any, args?: any): any {
    this.httpApi.get('users/' + value).subscribe(response => {
      this.username = response.username;
    });

    return this.username;
  }
}
