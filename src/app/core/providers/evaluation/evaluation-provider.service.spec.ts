import { TestBed } from '@angular/core/testing';

import { EvaluationProviderService } from './evaluation-provider.service';

describe('EvaluationProviderService', () => {
  let service: EvaluationProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluationProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
