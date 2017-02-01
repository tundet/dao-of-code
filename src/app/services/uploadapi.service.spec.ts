/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UploadapiService } from './uploadapi.service';

describe('UploadapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadapiService]
    });
  });

  it('should ...', inject([UploadapiService], (service: UploadapiService) => {
    expect(service).toBeTruthy();
  }));
});
