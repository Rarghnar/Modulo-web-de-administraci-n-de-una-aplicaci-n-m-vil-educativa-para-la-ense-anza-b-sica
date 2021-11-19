import { TestBed } from '@angular/core/testing';

import { LessonProviderService } from './lesson-provider.service';

describe('LessonProviderService', () => {
  let service: LessonProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
