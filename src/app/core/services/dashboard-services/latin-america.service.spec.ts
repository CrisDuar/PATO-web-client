import { TestBed } from '@angular/core/testing';

import { LatinAmericaService } from './latin-america.service';

describe('LatinAmericaService', () => {
  let service: LatinAmericaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LatinAmericaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
