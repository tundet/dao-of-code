import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpApi} from "../../providers/http-api";
import {SinglePage} from "../single/single";

/*
 Generated class for the Group page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-group',
  templateUrl: 'group.html'
})
export class GroupPage {

  api_url: string = 'https://dao-api.othnet.ga/uploads/';

  private groupInfo;
  private groupInfoBackup;
  private groupMedia;
  private userInfo;
  private owner: boolean = false;
  private changeEditButton: string = "Edit";
  private edit: boolean = false;
  private edited: boolean = false;

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpApi: HttpApi) {
    // Get group info
    let id = this.navParams.get("id");
    this.httpApi.get(`groups/${id}`).subscribe(response => {
      this.groupInfo = response;
      this.httpApi.get(`groups/${id}/media`).subscribe(response => {
        //console.log(this.groupMedia);
        this.groupMedia = response;
      });
      this.httpApi.getUserName(this.groupInfo.user_id).subscribe(response => {
        this.userInfo = response;
        if (this.userInfo.username == window.localStorage.getItem("dao_user")) {
          this.owner = true;
        }
      });
    })
  }

  /**
   * Change edit mode on and off. If backup is true it will revert all changes
   *
   * @param backup
   */
  changeEdit(backup:boolean) {
    if (this.edit) {
      this.edit = false;
      this.changeEditButton = "Edit";
      if (backup) {
        this.groupInfo = JSON.parse(JSON.stringify(this.groupInfo));
      }
    } else {
      this.edit = true;
      this.groupInfoBackup = JSON.parse(JSON.stringify(this.groupInfo));
      this.changeEditButton = "Cancel edit";
    }
  }

  /**
   * Moves given index in list one stage higher, and turns on group_priority saving on media
   *
   * @param index
   */
  upArrowPressed(index: number) {
    this.edited = true;
    let newList = [];

    // ok
    if (index > 1) {
      for (let i = 0; i < index - 1; i++) {
        this.groupMedia[i].group_priority = i;
        newList.push(this.groupMedia[i]);
      }
    }

    this.groupMedia[index].group_priority = index -1;
    newList.push(this.groupMedia[index]);
    this.groupMedia[index-1].group_priority = index;
    newList.push(this.groupMedia[index -1]);

    if (index < this.groupMedia.length) {
      for (let i = index + 1; i < this.groupMedia.length; i++) {
        this.groupMedia[i].group_priority = i;
        newList.push(this.groupMedia[i]);
      }
    }
    this.groupMedia = newList;
  }

  /**
   * Moves given index in list one stage lower, and turns on group_priority saving on media
   *
   * @param index
   */
  downArrowPressed(index: number) {
    this.edited = true;
    let newList = [];

    // ok
    if (index >= 1) {
      for (let i = 0; i < index; i++) {
        this.groupMedia[i].group_priority = i;
        console.log(JSON.stringify(this.groupMedia[i]));
        newList.push(this.groupMedia[i]);
      }
    }

    this.groupMedia[index + 1].group_priority = index;
    newList.push(this.groupMedia[index + 1]);
    this.groupMedia[index].group_priority = index +1;
    newList.push(this.groupMedia[index]);

    if (index + 2 < this.groupMedia.length) {
      for (let i = index + 2; i < this.groupMedia.length; i++) {
        this.groupMedia[i].group_priority = i;
        newList.push(this.groupMedia[i]);
      }
    }
    this.groupMedia = newList;
  }

  /**
   * Saves changes in group and if needed triggers group_priority save allso
   */
  save() {
    this.httpApi.patch(`/groups/${this.groupInfo.id}`, this.groupInfo).subscribe(response => {
      console.log(response);
      this.changeEdit(false);
    })
    if (this.edited) {
      this.saveMediaOrder();
    }
  }

  /**
   * Saves group_prioritys to media
   */
  saveMediaOrder() {
    for (let media of this.groupMedia) {
      this.httpApi.patch(`/media/${media.id}`, media).subscribe(response => {
        console.log("media " + media.id + " updated! " + response);
      });
    }
    this.changeEdit(false);
    this.edited = false;
  }

  /**
   * Opens tapped single media in new layer by id
   *
   * @param event
   * @param id
   */
  itemTapped(event, id) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(SinglePage, {
      id: id
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupPage');
  }

}
