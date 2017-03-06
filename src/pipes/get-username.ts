import { Injectable, Pipe } from '@angular/core';
import { HttpApi } from "../providers/http-api";

/**
 * Get username matching the given user ID.
 */
@Pipe({
  name: 'GetUsername',
})
@Injectable()
export class GetUsername {

  /**
   * GetUsername constructor.
   *
   * @param httpApi Injected HttpApi service
   */
  constructor(private httpApi: HttpApi) {

  }

  private username: string;

  /**
   * Return username that matches the given user ID.
   *
   * @param {int} value ID of the user
   * @returns {string} Username
   */
  transform(value: number): any {
    return this.httpApi.get('users/' + value).subscribe(response => {
      this.username = response.username;

      console.log('pipe response: ' + this.username);
      return this.username;
    });

  }
}
