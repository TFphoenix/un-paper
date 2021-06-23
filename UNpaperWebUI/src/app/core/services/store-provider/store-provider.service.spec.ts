import { TestBed } from '@angular/core/testing';

import { StoreProviderService } from './store-provider.service';

describe('StoreProviderService', () => {
  let service: StoreProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
