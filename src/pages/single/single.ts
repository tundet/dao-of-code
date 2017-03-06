import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpApi} from "../../providers/http-api";
import {GroupPage} from "../group/group";
import { global } from '../../app/global';

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
  private groupInfo;
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

  private languages = global.languages;

  api_url: string = 'https://dao-api.othnet.ga/uploads/original/';

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpApi: HttpApi) {
    let id = this.navParams.get('id');
    console.log(id);

    this.httpApi.get(`media/${id}`).subscribe(response => {
      this.mediaInfo = response;
      if (this.mediaInfo.group_id != null) {
        this.updateGroupInfo(this.mediaInfo.group_id);
      }
      console.log(this.mediaInfo);
      if (this.mediaInfo.media_type == "text") {
        this.httpApi.get(`uploads/original/${this.mediaInfo.file_name}`).subscribe(response => {
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

  updateGroupInfo(id) {
    this.httpApi.get(`groups/${id}`).subscribe(response => {
      this.groupInfo = response;
      this.userGroupsSelectedId = this.groupInfo.id;
      this.groupNew = false;
      this.groupOld = true;
    });
  }

  editClick() {
    this.editMedia = JSON.parse(JSON.stringify(this.mediaInfo));
    this.edit = true;
    this.httpApi.get(`/users/${this.mediaInfo.user_id}/groups`).subscribe(response => {
      this.userGroups = response;
      this.langChange();
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
    let data = {};
    if (this.groupNew && this.newGroupName) {
      if (this.newGroupName.trim().length >= 4) {
        let newGroupFormData = {};
        newGroupFormData["name"] = this.newGroupName.trim();
        newGroupFormData["tag"] = this.editMedia.tag;
        this.httpApi.makeGroup(newGroupFormData).subscribe(response => {
          console.log(response);
          data["group_id"] = response.id;
          this.updateGroupInfo(response.id);
          this.saveMediaChanges(data);
        });
      }
    } else if (this.groupOld && this.userGroupsSelectedId){
      data["group_id"] = this.userGroupsSelectedId;
      this.updateGroupInfo(this.userGroupsSelectedId);
      this.saveMediaChanges(data);
    } else {
      this.saveMediaChanges(data);
    }
  }

  saveMediaChanges(data) {
    if (this.mediaInfo.title != this.editMedia.title) {
      data["title"] = this.editMedia.title;
    }
    if (this.mediaInfo.tag != this.editMedia.tag) {
      data["tag"] = this.editMedia.tag;
    }
    if (this.mediaInfo.description != this.editMedia.description) {
      data["description"] = this.editMedia.description;
    }

    this.httpApi.patch(`media/${this.mediaInfo.id}`, data).subscribe(response => {
      console.log(response);
      this.mediaInfo = JSON.parse(JSON.stringify(this.editMedia));
      this.edit = false;
    });
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

  loadGroup(id) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(GroupPage, {
      id: id
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SinglePage');

  }

}
