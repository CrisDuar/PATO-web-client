import { TestBed } from '@angular/core/testing';

import { ColDeptService } from './col-dept.service';

describe('ColDeptService', () => {
  let service: ColDeptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColDeptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
