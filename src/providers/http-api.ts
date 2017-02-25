import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

@Injectable()
export class HttpApi {

  headers: Headers = new Headers({
    'Content-type': 'application/json',
    'Accept': 'application/json'
  });

  headers2: Headers = new Headers({
    'Accept': 'application/json'
  });

  api_url: string = 'https://dao-api.othnet.ga/';
  JWT_KEY: string = 'dao_token';

  constructor(private http: Http) {
  }

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

  getUserName = (value: any) => {
    this.setXAccessToken();
    return this.http.get(`${this.api_url}users/` + value, {headers: this.headers})
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson);
  }

  getNew = (amount: number) => {
    //GET http://[BASE-URL]/media?start=10&limit=10
    this.setXAccessToken();
    return this.http.get(this.api_url + `media/latest/${amount}`, {headers: this.headers});
  };

  getText = (filename: string) => {
    console.log(this.api_url + `uploads/original/${filename}`);
    //this.setXAccessToken();
    return this.http.get(this.api_url + `uploads/original/${filename}`);
  };

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
    return this.http.post(
      `${this.api_url}${path}`,
      body,
      {headers: this.headers2}
    )
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map((res: Response) => res.json())
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

  patch(path: string, body): Observable<any> {
    this.setXAccessToken();
    console.log(body);
    return this.http.patch(`${this.api_url}${path}`,
      body,
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
    Object.keys(headers).forEach(header => this.headers2.set(header, headers[header]));
  }
}
