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

  private uploadType: string = 'image';
  private grouptype: string = 'new';
  private groupNew: boolean = true;
  private groupOld: boolean = false;
  private oldGroups = [];
  private formOldGroupsInSelectedTag: any = [];
  private oldGroupsSelectedId: any = '';
  private formImageFile: File;
  private formVideoFile: File;
  private formTextFile: File;
  private formAudioFile: File;
  private formyoutubeLink: string;
  private formtitle: string;
  private formdescription: string;
  private formnewgroupname: string;
  private formlang: any = 'java';
  private oldgroupsIndex: any;

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

  private resetJson(json) {
    for (let i in json) {
      json[i] = '';
    }
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

  videoFileChange(fileElement: any) {
    if (fileElement.target.files && fileElement.target.files[0]) {
      this.formVideoFile = fileElement.target.files[0];
      // filreDER GET TYPE JNE...
    }
  }

  imageFileChange(fileElement: any) {
    if (fileElement.target.files && fileElement.target.files[0]) {
      this.formImageFile = fileElement.target.files[0];
    }
  }

  textFileChange(fileElement: any) {
    if (fileElement.target.files && fileElement.target.files[0]) {
      this.formTextFile = fileElement.target.files[0];
    }
  }

  audioFileChange(fileElement: any) {
    if (fileElement.target.files && fileElement.target.files[0]) {
      this.formAudioFile = fileElement.target.files[0];
    }
  }

  submitNewMedia() {
    let formData = new FormData();
    if (this.uploadType == "video") {
      formData.append("file", this.formVideoFile);
      formData.append("media_type", "video");
    } else if (this.uploadType == "image") {
      formData.append("file", this.formImageFile);
      //console.log(this.formImageFile);
      formData.append("media_type", "image");
    } else if (this.uploadType == "text") {
      formData.append("file", this.formTextFile);
      //console.log(this.formImageFile);
      formData.append("media_type", "text");
    } else if (this.uploadType == "audio") {
      formData.append("file", this.formAudioFile);
      //console.log(this.formImageFile);
      formData.append("media_type", "audio");
    } else if (this.uploadType == "youtube" && this.formyoutubeLink) {
      formData.append("youtube", this.formyoutubeLink);
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
      if ( this.formnewgroupname.trim().length >= 4) {
        // make new group and set id and tag in data
        let newGroupFormData = new FormData();
        newGroupFormData.append("name", this.formnewgroupname.trim());
        newGroupFormData.append("tag", this.formlang);
        this.httpApi.makeGroup(newGroupFormData).subscribe(response => {
          console.log(response);
          formData.append("group_id", response.id);
        });
      }
    } else {
      formData.append("group_id", this.oldGroupsSelectedId);
    }
    this.httpApi.postUpload("media", formData).subscribe(response => {
      console.log(response);
      if (response.message.startsWith("Medium") && response.message.endsWith("has been created.")){
        this.navCtrl.setRoot(Page2);
      }
    });
  }
}
