import { Pipe, PipeTransform } from '@angular/core';
import {HttpapiService} from "../httpapi.service";

@Pipe({
  name: 'getUsername'
})
export class GetUsernamePipe implements PipeTransform {

  constructor(private httpApi: HttpapiService) {}

  transform(value: any, args?: any): any {
    this.httpApi.get('users/' + value).subscribe(response => {
      return response.username;
    });
  }

}
