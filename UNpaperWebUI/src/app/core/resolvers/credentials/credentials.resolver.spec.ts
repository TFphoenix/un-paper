import { TestBed } from '@angular/core/testing';

import { CredentialsResolver } from './credentials.resolver';

describe('CredentialsResolver', () => {
  let resolver: CredentialsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CredentialsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
