/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BackendInterceptor } from './backend-interceptor.service';

describe('Service: BackendInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendInterceptor]
    });
  });

  it('should ...', inject([BackendInterceptor], (service: BackendInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
