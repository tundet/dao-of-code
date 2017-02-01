import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class UploadapiService {

  headers: Headers = new Headers({
    'Accept': 'application/json'
  });

  api_url: string = 'https://dao-api.othnet.ga/';
  JWT_KEY: string = 'dao_token';

  private getJson(response: Response) {
    return response.json();
  }

  private checkForError(response: Response): Response {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error['response'] = response;
      console.error(error);
      throw error;
    }
  }

  makeGroup(body): Observable<any> {
    this.setXAccessToken();
    return this.http.post(`${this.api_url}/groups`,
      body,
      {headers: this.headers}
    )
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map((res: Response) => res.json())
  }

  postUpload(path: string, body): Observable<any> {
    this.setXAccessToken();
    this.setHeaders({'Content-Type': 'multipart/form-data'});
    return this.http.post(
      `${this.api_url}${path}`,
      body,
      {headers: this.headers}
    )
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map((res: Response) => res.json())
  }

  setXAccessToken() {
    let xAToken: string = window.localStorage.getItem(this.JWT_KEY);
    // console.log(xAToken);
    if (xAToken) {
      this.setHeaders({'x-access-token': xAToken});
      // console.log(this.headers.get('x-access-token'))
    }
  }

  setHeaders(headers) {
    Object.keys(headers).forEach(header => this.headers.set(header, headers[header]));
  }

  constructor(private http: Http) {
  }

}
