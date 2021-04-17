import { TestBed } from '@angular/core/testing';

import { FunctionsApiRequestService } from './functions-api-request.service';

describe('FunctionsApiRequestService', () => {
  let service: FunctionsApiRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunctionsApiRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
