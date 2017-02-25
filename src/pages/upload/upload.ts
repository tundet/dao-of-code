import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpApi} from "../../providers/http-api";
import {Page2} from "../page2/page2";

/*
 Generated class for the Upload page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html'
})
export class UploadPage {

  private JWT_USER: string = 'dao_user';

  private uploadType: string = 'file';
  private groupNew: boolean = true;
  private groupOld: boolean = false;
  private oldGroups = [];
  private formOldGroupsInSelectedTag: any = [];
  private oldGroupsSelectedId: any = '';
  private formFile: File;
  private formFileType: any;
  private formFileMime_type: any;
  private formyoutubeLink: string;
  private formtitle: string;
  private formdescription: string;
  private formnewgroupname: string;
  private formlang: any = 'java';

  languages: any = [
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
    let userN = window.localStorage.getItem(this.JWT_USER);
    this.httpApi.get(`users/${userN}/groups`).subscribe(response => {
      //console.log(response);
      this.oldGroups = response;
      if (this.oldGroups[0]) {
        this.formLangChange();
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

  newGroupChange(event) {
    if (this.groupNew) {
      this.groupOld = false;
    } else {
      this.groupOld = true;
    }
  }

  oldGroupChange(event) {
    if (this.groupOld) {
      this.groupNew = false;
    } else {
      this.groupNew = true;
    }
  }

  formLangChange() {
    this.formOldGroupsInSelectedTag = [];
    for (let group of this.oldGroups) {
      if (group.tag == this.formlang) {
        console.log(group);
        this.formOldGroupsInSelectedTag.push(group);
      }
    }
  }

  fileChange(fileElement: any) {
    if (fileElement.target.files && fileElement.target.files[0]) {
      this.formFile = fileElement.target.files[0];
      console.log(this.formFile.type);
      this.formFileMime_type = this.formFile.type;
      if (this.formFile.type.startsWith("video")) {
        this.formFileType = "video";
      } else if (this.formFile.type.startsWith("audio")) {
        this.formFileType = "audio";
      } else if (this.formFile.type.startsWith("image")) {
        this.formFileType = "image";
      } else if (this.formFile.type.startsWith("text") || this.formFile.type.startsWith("application")) {
        this.formFileType = "text";
      }
      console.log(this.formFile.name);
    }
  }

  youtubeLinkChange() {
    console.log("modifying....");
    let orginal_url = this.formyoutubeLink;
    orginal_url = orginal_url.replace("youtube.com/", "youtube.com/embed/");
    console.log(orginal_url);
    orginal_url = orginal_url.replace("watch?v=", "");
    console.log(orginal_url);
    let end_url = orginal_url.substring(orginal_url.indexOf("embed/"), orginal_url.length);
    orginal_url = orginal_url.substring(0, orginal_url.indexOf("embed/"));
    if (end_url.indexOf("?") > 0) {
      orginal_url += end_url.substring(0, end_url.indexOf("?"));
      console.log(orginal_url);
    } else {
      orginal_url += end_url;
      console.log(orginal_url);
    }
    this.formyoutubeLink = orginal_url;
  }

  submitNewMedia() {
    let formData = new FormData();
    if (this.uploadType == "file") {
      formData.append("file", this.formFile);
      formData.append("media_type", this.formFileType);
    } else if (this.uploadType == "youtube" && this.formyoutubeLink) {
      formData.append("youtube_url", this.formyoutubeLink);
      formData.append("media_type", "youtube");
    }
    if (this.formtitle) {
      formData.append("title", this.formtitle);
    }
    if (this.formdescription) {
      formData.append("description", this.formdescription);
    }
    if (this.formlang) {
      formData.append("tag", this.formlang);
    }
    if (this.groupNew && this.formnewgroupname) {
      if (this.formnewgroupname.trim().length >= 4) {
        // make new group and set id and tag in data
        let newGroupFormData = {};
        newGroupFormData["name"] = this.formnewgroupname.trim();
        newGroupFormData["tag"] = this.formlang;
        this.httpApi.makeGroup(newGroupFormData).subscribe(response => {
          console.log(response);
          formData.append("group_id", response.id);
          this.httpApi.postUpload("media", formData).subscribe(response => {
            console.log(response);
            if (response.message.startsWith("Medium") && response.message.endsWith("has been created.")) {
              this.navCtrl.setRoot(Page2);
            }
          });
        });
      }
    } else if (this.groupOld && this.oldGroupsSelectedId) {
      formData.append("group_id", this.oldGroupsSelectedId);
      this.httpApi.postUpload("media", formData).subscribe(response => {
        console.log(response);
        if (response.message.startsWith("Medium") && response.message.endsWith("has been created.")) {
          this.navCtrl.setRoot(Page2);
        }
      });
    } else {
      this.httpApi.postUpload("media", formData).subscribe(response => {
        console.log(response);
        if (response.message.startsWith("Medium") && response.message.endsWith("has been created.")) {
          this.navCtrl.setRoot(Page2);
        }
      });
    }
  }

}
