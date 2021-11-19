import { TestBed } from '@angular/core/testing';

import { StudentProviderService } from './student-provider.service';

describe('StudentProviderService', () => {
  let service: StudentProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
