import { TestBed } from '@angular/core/testing';

import { PassRecoveryService } from './pass-recovery.service';

describe('PassRecoveryService', () => {
  let service: PassRecoveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassRecoveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
