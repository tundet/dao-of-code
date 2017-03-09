import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

@Injectable()
export class HttpApi {

  /**
   * Common headers to be added in requests
   *
   * @type {Headers}
   */
  headers: Headers = new Headers({
    'Content-type': 'application/json',
    'Accept': 'application/json'
  });

  /**
   * Upload headers to be added in request
   *
   * @type {Headers}
   */
  headers2: Headers = new Headers({
    'Accept': 'application/json'
  });

  api_url: string = 'https://dao-api.othnet.ga/';
  // loacalstorage token name
  JWT_KEY: string = 'dao_token';

  constructor(private http: Http) {
  }

  /**
   * Turns response to Json
   *
   * @param response
   * @returns {any}
   */
  private static getJson(response: Response) {
    return response.json();
  }

  /**
   * Checks response for errors
   *
   * @param response
   * @returns {Response}
   */
  private static checkForError(response: Response): Response {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error['response'] = response;
      console.error(error);
      throw error;
    }
  }

  /**
   * Sends logout requests to API
   *
   * @returns {Observable<any>}
   */
  logout(): Observable<any> {
    this.setXAccessToken();
    return this.http.post(`${this.api_url}signout`, {})
      .map(HttpApi.checkForError)
      .catch(err => Observable.throw(err))
      .map(HttpApi.getJson);
  }

  /**
   * Sends get requests to API for given username or id
   *
   * @param value request username or id as string
   * @returns {Observable<any>}
   */
  getUserName = (value: string) => {
    this.setXAccessToken();
    return this.http.get(`${this.api_url}users/` + value, {headers: this.headers})
      .map(HttpApi.checkForError)
      .catch(err => Observable.throw(err))
      .map(HttpApi.getJson);
  };

  getUserNames = (medias: any) => {
    let ids = [];
    for (let media of medias) {
      ids.push(media.user_id);
    }
    let body = { id: ids };
    this.setXAccessToken();
    return this.http.post(this.api_url + "get-usernames", body, {headers: this.headers})
      .map(HttpApi.checkForError)
      .catch(err => Observable.throw(err))
      .map(HttpApi.getJson);
  };

  /**
   * Sends get requests to API for X amount of new posts
   *
   * @param amount
   * @returns {Observable<Response>}
   */
  getNew = (amount: number) => {
    //GET http://[BASE-URL]/media?start=10&limit=10
    this.setXAccessToken();
    return this.http.get(this.api_url + `media/latest/${amount}`, {headers: this.headers});
  };

  /**
   * Sends get requests to API for X amount of new posts by tag
   *
   * @param tag Language tag of groups
   * @param amount Amount of groups wanted
   * @returns {Observable<any>}
   */
  getNewGroupsByTag = (tag: string, amount: number) => {
    this.setXAccessToken();
    return this.http.get(
      this.api_url + `groups/latest/${tag}/${amount}`,
      {headers: this.headers}
    )
      .map(HttpApi.checkForError)
      .catch(err => Observable.throw(err))
      .map(HttpApi.getJson);
  };

  /**
   * Sends get requests to API for X amount of new posts by tag
   *
   * @param tag Language tag of groups
   * @param amount Amount of groups wanted
   * @returns {Observable<any>}
   */
  getNewPostsByTag = (tag: string, amount: number) => {
    this.setXAccessToken();
    return this.http.get(
      this.api_url + `media/latest/ungrouped/${tag}/${amount}`,
      {headers: this.headers}
    )
      .map(HttpApi.checkForError)
      .catch(err => Observable.throw(err))
      .map(HttpApi.getJson);
  };

  /**
   * Sends requests to make new group to API
   *
   * @param body
   * @returns {Observable<any>}
   */
  makeGroup(body): Observable<any> {
    this.setXAccessToken();
    console.log(body);
    return this.http.post(`${this.api_url}groups`,
      body,
      {headers: this.headers}
    )
      .map(HttpApi.checkForError)
      .catch(err => Observable.throw(err))
      .map(HttpApi.getJson)
  }

  /**
   * Sends upload requests to API
   *
   * @param body request body as JSON
   * @returns {Observable<any>}
   */
  postUpload(body): Observable<any> {
    this.setXAccessToken();
    return this.http.post(
      this.api_url + `media/`,
      body,
      {headers: this.headers2}
    )
      .map(HttpApi.checkForError)
      .catch(err => Observable.throw(err))
      .map(HttpApi.getJson)
  }

  /**
   * Sends get requests to API
   *
   * @param path
   * @returns {Observable<any>}
   */
  get(path: string): Observable<any> {
    this.setXAccessToken();
    return this.http.get(`${this.api_url}${path}`, {headers: this.headers})
      .map(HttpApi.checkForError)
      .catch(err => Observable.throw(err))
      .map(HttpApi.getJson)
  }

  /**
   * Sends delete requests to API
   *
   * @param path
   * @param body request body as JSON
   * @returns {Observable<any>}
   */
  post(path: string, body): Observable<any> {
    this.setXAccessToken();
    return this.http.post(
      `${this.api_url}${path}`,
      body,
      {headers: this.headers}
    )
      .map(HttpApi.checkForError)
      .catch(err => Observable.throw(err))
      .map(HttpApi.getJson)
  }

  /**
   * Sends patch requests to API
   *
   * @param path
   * @param body request body as JSON
   * @returns {Observable<any>}
   */
  patch(path: string, body): Observable<any> {
    this.setXAccessToken();
    return this.http.patch(`${this.api_url}${path}`,
      body,
      {headers: this.headers}
      )
      .map(HttpApi.checkForError)
      .catch(err => Observable.throw(err))
      .map(HttpApi.getJson)
  }

  //noinspection ReservedWordAsName
  /**
   * Sends delete requests to API
   *
   * @param path
   * @returns {Observable<any>}
   */
  delete(path: string): Observable<any> {
    return this.http.delete(
      `${this.api_url}${path}`,
      {headers: this.headers}
    )
      .map(HttpApi.checkForError)
      .catch(err => Observable.throw(err))
      .map(HttpApi.getJson)
  }

  /**
   * Sets token from localstorage to headers
   */
  setXAccessToken() {
    let xAToken: string = window.localStorage.getItem(this.JWT_KEY);
    if (xAToken) {
      this.setHeaders({'x-access-token': xAToken});
    }
  }

  /**
   * Adds given header to post headers
   *
   * @param headers
   */
  setHeaders(headers) {
    Object.keys(headers).forEach(header => this.headers.set(header, headers[header]));
    Object.keys(headers).forEach(header => this.headers2.set(header, headers[header]));
  }
}
