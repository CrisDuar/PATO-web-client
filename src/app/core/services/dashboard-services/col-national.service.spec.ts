import { TestBed } from '@angular/core/testing';

import { ColNationalService } from './col-national.service';

describe('ColNationalService', () => {
  let service: ColNationalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColNationalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
