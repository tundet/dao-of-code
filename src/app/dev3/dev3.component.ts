import {Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import {HttpapiService} from "../httpapi.service";
import {FILE} from "dns";

@Component({
  selector: 'app-dev3',
  templateUrl: './dev3.component.html',
  styleUrls: ['dev3.component.scss']
})
export class Dev3Component implements OnInit {

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

  private formImageFile:File;
  private formVideoFile:File;
  private formyoutubeLink: string;
  private formtitle: string;
  private formdescription: string;
  private formnewgroupname: string;
  private formnewgrouplang: string;

  //Preview
  private image: HTMLImageElement = new Image();
  @ViewChild('myCanvas') canvasRef: ElementRef;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

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
  ]


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
    }
    if (name == "gNew") {
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

  }

  imageFileChange(fileElement: any) {
    if (fileElement.target.files && fileElement.target.files[0]) {
      const reader: FileReader = new FileReader();

      reader.addEventListener('load', (evt: any) => {
        console.log(evt.target);
        this.image.src = evt.target.result;
        this.image.addEventListener('load', this.resetImage);
      });
      this.formImageFile = fileElement.target.files[0];
      reader.readAsDataURL(fileElement.target.files[0]); // <-- Shows image
    }
  }

  resetImage = () => {
    this.canvas.height = this.image.height;
    this.canvas.width = this.image.width;

    this.context.drawImage(this.image, 0, 0, this.image.width, this.image.height);
  };

  submitNewMedia() {
    let data = {
      "file": null,
      "youtubelink": '',
      "title": '',
      "description": '',
      "media_type": '',
      "group_id": '',
      "tag": ''
    }
    if (this.typeImageFile) {
      data.file = this.formImageFile;
      data.media_type = "image";
    }
    if (this.typeYoutube && this.formyoutubeLink) {
      data.youtubelink = this.formyoutubeLink;
    }
    if (this.formtitle) {
      data.title = this.formtitle;
    }
    if (this.formdescription) {
      data.description = this.formdescription;
    }
    if (this.groupNew) {
      // make new group and set id and tag in data
    } else {
      data.group_id = this.oldGroupsSelectedId;
      data.tag = this.oldGroupsSelectedTag;
    }
    console.log(data);
  }

  constructor(private httpApi: HttpapiService) {
    let userN = window.localStorage.getItem(this.JWT_USER);
    this.httpApi.get(`users/${userN}/groups`).subscribe(response => {
      console.log(response);
      this.oldGroups = response;
      this.oldGroupsSelectedTag = this.oldGroups[0].tag;
      this.oldGroupsSelectedId = this.oldGroups[0].id;
      this.formnewgrouplang = this.languages[0].value;
    });
  }

  ngOnInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.context = this.canvas.getContext('2d');
  }

}
