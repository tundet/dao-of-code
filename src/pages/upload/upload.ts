import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpApi} from "../../providers/http-api";
import {UploadApi} from "../../providers/upload-api";

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

  private TODO: boolean = true;
  private JWT_USER: string = 'dao_user';

  private typeVideoFile: boolean = false;
  private typeImageFile: boolean = false;
  private typeYoutube: boolean = false;
  private groupNew: boolean = true;
  private groupOld: boolean = false;
  private oldGroups = [];
  private oldGroupsSelectedTag: any = '';
  private oldGroupsSelectedId: any = '';

  private formImageFile: File;
  private formVideoFile: File;
  private formyoutubeLink: string;
  private formtitle: string;
  private formdescription: string;
  private formnewgroupname: string;
  private formnewgrouplang: string;

  //Preview
  /*private image: HTMLImageElement = new Image();
  @ViewChild('myCanvas') canvasRef: ElementRef;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;*/

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


  constructor(public navCtrl: NavController, public navParams: NavParams, private httpApi: HttpApi, private uploadApi: UploadApi) {
    let userN = window.localStorage.getItem(this.JWT_USER);
    this.httpApi.get(`users/${userN}/groups`).subscribe(response => {
      //console.log(response);
      this.oldGroups = response;
      this.oldGroupsSelectedTag = this.oldGroups[0].tag;
      this.oldGroupsSelectedId = this.oldGroups[0].id;
      this.formnewgrouplang = this.languages[0].value;
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

  newGroupsLangSelectedChange(value) {
    this.formnewgrouplang = value;
  }

  oldGroupsSelectedChange(id, value) {
    this.oldGroupsSelectedId = id;
    this.oldGroupsSelectedTag = value;
  }

  typeChange(event) {
    let name = event.target.name;
    if (name == "imagecb") {
      if (this.typeImageFile) {
        this.typeVideoFile = false;
      }
    } else if (name == "videocb") {
      if (this.typeVideoFile) {
        this.typeImageFile = false;
      }
    } else if (name == "gNew") {
      if (this.groupNew) {
        this.groupOld = false;
      } else {
        this.groupOld = true;
      }
    } else if (name == "gOld") {
      if (this.groupOld) {
        this.groupNew = false;
      } else {
        this.groupNew = true;
      }
    }
  }

  videoFileChange(fileElement: any) {
    if (fileElement.target.files && fileElement.target.files[0]) {
      this.formVideoFile = fileElement.target.files[0];
    }
  }

  imageFileChange(fileElement: any) {
    if (fileElement.target.files && fileElement.target.files[0]) {
      const reader: FileReader = new FileReader();

      reader.addEventListener('load', (evt: any) => {
        console.log(evt.target);
        //this.image.src = evt.target.result;
        //this.image.addEventListener('load', this.resetImage);
      });
      //console.log(fileElement.target);
      this.formImageFile = fileElement.target.files[0];
      reader.readAsDataURL(fileElement.target.files[0]); // <-- Shows image
    }
  }

  /*resetImage = () => {
    this.canvas.height = this.image.height;
    this.canvas.width = this.image.width;

    this.context.drawImage(this.image, 0, 0, this.image.width, this.image.height);
  };*/

  submitNewMedia() {
    let formData = new FormData();
    if (this.typeVideoFile) {
      formData.append("file", this.formVideoFile);
      formData.append("media_type", "video");
    }
    if (this.typeImageFile) {
      formData.append("file", this.formImageFile);
      //console.log(this.formImageFile);
      formData.append("media_type", "image");
    }
    if (this.typeYoutube && this.formyoutubeLink) {
      formData.append("youtube", this.formyoutubeLink);
    }
    if (this.formtitle) {
      formData.append("title", this.formtitle);
    }
    if (this.formdescription) {
      formData.append("description", this.formdescription);
    }
    if (this.groupNew && this.formnewgroupname.trim().length >= 4) {
      // make new group and set id and tag in data
      let newGroupFormData = new FormData();
      newGroupFormData.append("name", this.formnewgroupname.trim());
      newGroupFormData.append("tag", this.formnewgrouplang);
      this.uploadApi.makeGroup(newGroupFormData).subscribe(response => {
        console.log(response);
        formData.append("group_id", response.id);
        formData.append("tag", this.formnewgrouplang);
      });
    } else {
      formData.append("group_id", this.oldGroupsSelectedId);
      formData.append("tag", this.oldGroupsSelectedTag);
    }
    this.uploadApi.postUpload("media",formData).subscribe(response => {
      console.log(response);
    });
  }

}
