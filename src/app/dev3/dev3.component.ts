import { Component, OnInit } from '@angular/core';
import {HttpapiService} from "../httpapi.service";

@Component({
  selector: 'app-dev3',
  templateUrl: './dev3.component.html',
  styleUrls: ['dev3.component.scss']
})
export class Dev3Component implements OnInit {

  TODO: boolean = true;

  private resetJson (json){
    for (let i in json) {
      json[i] = '';
    }
  }

  constructor(private httpApi: HttpapiService) { }

  ngOnInit() {
  }

}
