import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpApi} from "../../providers/http-api";
import {GroupPage} from "../group/group";
import {global} from '../../app/global';
import {Page2} from "../page2/page2";
import {SearchPage} from "../search/search";

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
  private posts = [];
  private postUsers = [];
  private commentUsers = [];
  private mediaInfo;
  private groupInfo;
  private username;
  private userid;
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

  /**
   * Gets page content
   *
   * @param navCtrl
   * @param navParams
   * @param httpApi
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpApi: HttpApi) {
    this.userid = window.localStorage.getItem('dao_user_id');

    let id = this.navParams.get('id');
    console.log(id);

    this.httpApi.get(`media/${id}`).subscribe(response => {
      this.mediaInfo = response;
      if (this.mediaInfo.group_id != null) {
        this.updateGroupInfo(this.mediaInfo.group_id);
      }
      console.log(this.mediaInfo);
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
      this.httpApi.getUserNames(this.comments).subscribe(response2 => {
        this.commentUsers = response2;
      });
    });

    /*Jos laitan ton yläpuolel olevan kohan tilalle getComments(id); niin toi refresh valittaa jostain lengthist*/

    this.refresh();
  }

  /**
   * Refreshed content data of page
   *
   * Todo: add refresh element
   */
  refresh(refresher = null) {
    this.posts = [];
    this.postUsers = [];
    this.httpApi.get(`users/1`).subscribe(response => {
        for (let medium of response) {
          this.httpApi.get(`media/` + medium.medium_id).subscribe(response2 => {
            this.posts.push(response2);
            if (response[response.length - 1] == medium) {
              this.httpApi.getUserNames(this.posts).subscribe(response3 => {
                this.postUsers = response3;
              });
            }
          });
        }
        if (refresher) {
          refresher.complete();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * Update group information of post
   *
   * @param id id corresponding to group id
   */
  updateGroupInfo(id) {
    this.httpApi.get(`groups/${id}`).subscribe(response => {
      this.groupInfo = response;
      this.userGroupsSelectedId = this.groupInfo.id;
      this.groupNew = false;
      this.groupOld = true;
    });
  }

  /**
   * Get post's comments
   *
   * @param id id corresponding to posts id
   */
  getComments(id) {
    this.httpApi.get((`media/${id}/comments`)).subscribe(response => {
        this.comments = response;
        this.comments.reverse();
        console.log(this.comments.user_id);
      }
    );
    this.httpApi.getUserNames(this.comments).subscribe(response2 => {
      this.commentUsers = response2;
    });
  }

  /**
   * Enables editing of the current post
   */
  editClick() {
    this.editMedia = JSON.parse(JSON.stringify(this.mediaInfo));
    this.edit = true;
    this.httpApi.get(`/users/${this.mediaInfo.user_id}/groups`).subscribe(response => {
      this.userGroups = response;
      this.langChange();
    });
  }

  /**
   * Changes the language tag of current post
   */
  langChange() {
    this.userGroupsInSelectedTag = [];
    for (let group of this.userGroups) {
      if (group.tag == this.editMedia.tag) {
        this.userGroupsInSelectedTag.push(group);
      }
    }
  }

  /**
   * Checkbox is clicked
   *
   * @param event
   */
  newGroupChange(event) {
    if (this.userGroupsInSelectedTag[0]) {
      this.groupOld = !this.groupNew
    } else {
      console.log(event.target.value);
      this.groupNew = true;
    }
  }

  /**
   * Checkbox is clicked
   */
  oldGroupChange() {
    this.groupNew = !this.groupOld;
  }

  /**
   * Checks if group data is changed and redirects to next step saveMediaChages()
   */
  saveClick() {
    let data = {};
    if (this.groupNew && this.newGroupName) {
      if (this.newGroupName.trim().length >= 4) {
        let newGroupFormData = {};
        newGroupFormData["name"] = this.newGroupName.trim();
        newGroupFormData["tag"] = this.editMedia.tag;
        newGroupFormData["description"] = "";
        this.httpApi.makeGroup(newGroupFormData).subscribe(response => {
          console.log(response);
          data["group_id"] = response.id;
          this.updateGroupInfo(response.id);
          this.saveMediaChanges(data);
        });
      }
    } else if (this.groupOld && this.userGroupsSelectedId) {
      data["group_id"] = this.userGroupsSelectedId;
      this.updateGroupInfo(this.userGroupsSelectedId);
      this.saveMediaChanges(data);
    } else {
      this.saveMediaChanges(data);
    }
  }

  /**
   * Step 2 function to saveClick()
   * @param data
   */
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

  /**
   * Posting a comment on current post
   *
   * @param event event corresponding to comment info
   */
  comment(event: any) {
    this.commentInfo = {
      medium_id: this.mediaInfo.id,
      comment: this.txtcomment
    };
    console.log(this.commentInfo);
    this.httpApi.post("comments", this.commentInfo).subscribe(response => {
      console.log(response);
      this.getComments(this.mediaInfo.id);
    });
    this.txtcomment = "";
  }

  /**
   * Deleting your own comment from current post
   *
   * @param id id corresponding to comment id to delete
   */
  deleteComment(id) {
    this.httpApi.delete(`comments/` + id).subscribe(response => {
      console.log(response);
      this.getComments(this.mediaInfo.id);
    });
  }

  /**
   * Course/ group link clicked
   * @param id Group id
   */
  loadGroup(id) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(GroupPage, {
      id: id
    });
  }

  /**
   * Changes user view and root to Home
   */
  toHome() {
    this.navCtrl.setRoot(Page2);
  }

  /**
   * Changes user view and root to search
   */
  toSearch() {
    this.navCtrl.setRoot(SearchPage);
  }

}
