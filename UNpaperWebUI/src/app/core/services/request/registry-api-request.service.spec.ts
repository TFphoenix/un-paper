import { TestBed } from '@angular/core/testing';

import { RegistryApiRequestService } from './registry-api-request.service';

describe('RegistryApiRequestService', () => {
  let service: RegistryApiRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistryApiRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
