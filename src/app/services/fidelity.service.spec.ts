import { TestBed } from '@angular/core/testing';

import { FidelityService } from './fidelity.service';

describe('FidelityService', () => {
  let service: FidelityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FidelityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
