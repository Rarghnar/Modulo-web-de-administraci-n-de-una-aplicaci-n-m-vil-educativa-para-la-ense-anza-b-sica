import { TestBed } from '@angular/core/testing';

import { CourseProviderService } from './course-provider.service';

describe('CourseProviderService', () => {
  let service: CourseProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
