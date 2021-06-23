import { TestBed } from '@angular/core/testing';

import { MetadataResolver } from './metadata.resolver';

describe('MetadataResolver', () => {
  let resolver: MetadataResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MetadataResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
