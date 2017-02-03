import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thumbnail'
})
export class ThumbnailPipe implements PipeTransform {

  readonly BASE_URL = 'https://dao-api.othnet.ga/uploads/';

  transform(value: any, size: string): string {
    return this.BASE_URL + size + '/' + value;
  }

}
