import { TestBed } from '@angular/core/testing';

import { UnitProviderService } from './unit-provider.service';

describe('UnitProviderService', () => {
  let service: UnitProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
