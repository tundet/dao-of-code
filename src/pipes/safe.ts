import { Injectable, Pipe } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

/**
 * Convert a URL into a safe version.
 */
@Pipe({
  name: 'safe'
})
@Injectable()
export class Safe {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value, args) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
