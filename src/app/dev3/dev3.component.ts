import {Component, OnInit} from '@angular/core';
import {HttpapiService} from "../httpapi.service";

@Component({
  selector: 'app-dev3',
  templateUrl: './dev3.component.html',
  styleUrls: ['dev3.component.scss']
})
export class Dev3Component implements OnInit {

  TODO: boolean = true;
  JWT_USER: string = 'dao_user';

  typeFile: boolean = true;
  typeYoutube: boolean = false;
  groupNew: boolean = true;
  groupOld: boolean = false;
  oldGroups = [];
  oldGroupsSelected: any = 0;
  oldGroupsSelectedTag: string = '';


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

  oldGroupsSelectedChange() {
    this.oldGroupsSelectedTag = this.oldGroups[this.oldGroupsSelected].tag;
  }

  typeChange(event) {
    let name = event.target.name;
    if (name == "file") {
      if (this.typeFile) {
        this.typeYoutube = false;
      } else {
        this.typeYoutube = true;
      }
    } else if (name == "youtube") {
      if (this.typeYoutube) {
        this.typeFile = false;
      } else {
        this.typeFile = true;
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

  constructor(private httpApi: HttpapiService) {
    let userN = window.localStorage.getItem(this.JWT_USER);
    this.httpApi.get(`/users/${userN}/groups`).subscribe(response => {
      console.log(response);
      this.oldGroups = response;
    });
  }

  ngOnInit() {
  }

}
