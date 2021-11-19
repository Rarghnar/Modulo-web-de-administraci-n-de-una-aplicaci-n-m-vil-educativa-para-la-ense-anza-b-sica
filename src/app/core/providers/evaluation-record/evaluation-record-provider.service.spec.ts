import { TestBed } from '@angular/core/testing';

import { EvaluationRecordProviderService } from './evaluation-record-provider.service';

describe('EvaluationRecordProviderService', () => {
  let service: EvaluationRecordProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluationRecordProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
