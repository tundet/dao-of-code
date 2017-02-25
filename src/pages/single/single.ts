import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpApi} from "../../providers/http-api";

/*
 Generated class for the Single page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-single',
  templateUrl: 'single.html',
})
export class SinglePage {

  private comments;
  private txtcomment: string = '';
  private commentInfo = {
    medium_id: "",
    comment: ""
  };
  private mediaInfo;
  private textMediaContent;
  private username;
  private userGroups;
  private userGroupsInSelectedTag: any = {};
  private owner: boolean = false;
  private edit: boolean = false;
  private newGroupName: string = '';
  private groupNew: boolean = true;
  private groupOld: boolean = false;
  private userGroupsSelectedId: any;
  private editMedia: any = {
    tag: ''
  };

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

  api_url: string = 'https://dao-api.othnet.ga/uploads/original/';

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpApi: HttpApi) {
    let id = this.navParams.get('id');
    console.log(id);

    this.httpApi.get(`media/${id}`).subscribe(response => {
      this.mediaInfo = response;
      this.editMedia = this.mediaInfo;

      console.log(this.mediaInfo);
      if (this.mediaInfo.media_type == "text") {
        this.httpApi.getText(this.mediaInfo.file_name).subscribe(response => {
          this.textMediaContent = response.text();
          console.log(response.text());
        })
      }
      this.httpApi.getUserName(this.mediaInfo.user_id).subscribe(response => {
        this.username = response.username;
        if (this.username == window.localStorage.getItem('dao_user')) {
          this.owner = true;
        }
      })
    });

    this.httpApi.get(`media/${id}/comments`).subscribe(response => {
      this.comments = response;
      console.log(this.comments);
    });
  }

  editClick() {
    this.edit = true;
    this.httpApi.get(`/users/${this.mediaInfo.user_id}/groups`).subscribe(response => {
      this.userGroups = response;
    });
  }

  langChange() {
    this.userGroupsInSelectedTag = [];
    for (let group of this.userGroups) {
      if (group.tag == this.editMedia.tag) {
        this.userGroupsInSelectedTag.push(group);
      }
    }
  }

  newGroupChange(event) {
    if (this.userGroupsInSelectedTag[0]) {
      if (this.groupNew) {
        this.groupOld = false;
      } else {
        this.groupOld = true;
      }
    } else {
      console.log(event.target.value);
      this.groupNew = true;
    }
  }

  oldGroupChange(event) {
    if (this.groupOld) {
      this.groupNew = false;
    } else {
      this.groupNew = true;
    }
  }

  saveClick() {
    this.edit = false;
  }

  comment(event: any) {
    this.commentInfo = {
      medium_id: this.mediaInfo.id,
      comment: this.txtcomment
    };
    console.log(this.commentInfo);
    this.httpApi.post("comments", this.commentInfo).subscribe(response => {
      console.log(response);
    });
    console.log(this.comments);
    this.txtcomment = "";
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SinglePage');

  }

}
