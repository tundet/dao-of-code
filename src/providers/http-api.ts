import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

@Injectable()
export class HttpApi {

  constructor(public http: Http) {
    console.log('Hello HttpApi Provider');
  }

  headers: Headers = new Headers({
    'Content-Type': 'application/json',
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

  logout(): Observable<any> {
    this.setXAccessToken();
    return this.http.post(`${this.api_url}signout`, {})
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson);
  }

  get(path: string): Observable<any> {
    this.setXAccessToken();
    return this.http.get(`${this.api_url}${path}`, {headers: this.headers})
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)
  }

  post(path: string, body): Observable<any> {
    this.setXAccessToken();
    return this.http.post(
      `${this.api_url}${path}`,
      JSON.stringify(body),
      {headers: this.headers}
    )
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map((res: Response) => res.json())
  }

  delete(path: string): Observable<any> {
    return this.http.delete(
      `${this.api_url}${path}`,
      {headers: this.headers}
    )
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)
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

}
