import { TestBed } from '@angular/core/testing';

import { IsSuperadminService } from './is-superadmin.service';

describe('IsSuperadminService', () => {
  let service: IsSuperadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsSuperadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
