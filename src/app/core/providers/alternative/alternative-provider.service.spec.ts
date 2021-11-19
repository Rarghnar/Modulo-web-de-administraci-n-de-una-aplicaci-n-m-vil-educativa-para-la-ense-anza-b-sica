import { TestBed } from '@angular/core/testing';

import { AlternativeProviderService } from './alternative-provider.service';

describe('AlternativeProviderService', () => {
  let service: AlternativeProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlternativeProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
