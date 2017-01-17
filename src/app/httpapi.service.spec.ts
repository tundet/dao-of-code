/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpapiService } from './httpapi.service';

describe('HttpapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpapiService]
    });
  });

  it('should ...', inject([HttpapiService], (service: HttpapiService) => {
    expect(service).toBeTruthy();
  }));
});
