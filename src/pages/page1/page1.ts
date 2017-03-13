import {Component} from '@angular/core';

import {NavController, ToastController} from 'ionic-angular';
import {HttpApi} from '../../providers/http-api';
import {Page2} from "../page2/page2";

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  showMode = "signin";
  newUserHasBeenMade: boolean = false;

  JWT_KEY: string = 'dao_token';
  JWT_USER: string = 'dao_user';
  JWT_USER_ID: string = 'dao_user_id';

  newUser = {
    username: '',
    password: '',
    email: ''
  };

  signinUser = {
    username: '',
    password: '',
  };

  loggedinUser = {
    username: '',
    token: '',
  };

  private resetJson(json) {
    for (let i in json) {
      json[i] = '';
    }
  }

  resetAllJsons() {
    this.resetJson(this.newUser);
    this.resetJson(this.loggedinUser);
    this.resetJson(this.signinUser);
  }

  /**
   * Creates new user and goes to sign in page
   * show toast whether
   */
  onSignup() {
    //console.log("Signup! start");
    this.httpApi.post("users", this.newUser).subscribe(response => {
      console.log(response);
      this.newUserHasBeenMade = true;
      let toast = this.toastCtrl.create({
        message: 'User creation successful',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.signinUser.username = this.newUser.username;
      this.showMode = 'signin';
    }, error => {
      let toast = this.toastCtrl.create({
        message: 'User creation failed',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
    //console.log("Signup! end");
  }

  /**
   * Signs user in and goes to home page
   * if authorization failed show toast
   */
  onSignin() {
    //console.log("Signin! start");
    this.httpApi.post("signin/", this.signinUser).subscribe(response => {
      console.log(response);

      if (response.status == 403) {
        return;
      }

      this.setJwt(response.api_token, this.signinUser.username, response.id);
      this.loggedinUser.username = this.signinUser.username;
      this.loggedinUser.token = response.api_token;
      this.resetJson(this.signinUser);
      this.navCtrl.setRoot(Page2);
    }, error =>{
      console.log("ei saatana" + error);
      let toast = this.toastCtrl.create({
        message: 'Username or password invalid',
        duration: 3000,
        position: 'top'
      });
      toast.present();

    });
  }

  /**
   * Signs user out
   */
  signout() {
    this.httpApi.logout();
    window.localStorage.removeItem(this.JWT_KEY);
    window.localStorage.removeItem(this.JWT_USER);
    window.localStorage.removeItem(this.JWT_USER_ID);
    this.httpApi.headers.delete('x-access-token');
    this.resetAllJsons();
    //console.log(this.httpApi.headers.toJSON());
    //console.log("Signout end!");
  }

  constructor(private httpApi: HttpApi, public navCtrl: NavController, private toastCtrl: ToastController) {
    const token = window.localStorage.getItem(this.JWT_KEY);
    const userN = window.localStorage.getItem(this.JWT_USER);
    const userId = window.localStorage.getItem(this.JWT_USER_ID);
    if (token) {
      this.setJwt(token, userN, userId);
      this.navCtrl.setRoot(Page2);
    }
  }

  /**
   * Saves user login information to local storage
   */
  setJwt(jwt: string, user: string, userId: string) {
    window.localStorage.setItem(this.JWT_KEY, jwt);
    window.localStorage.setItem(this.JWT_USER, user);
    window.localStorage.setItem(this.JWT_USER_ID, userId);
  }

  ngOnInit() {
  }

}
