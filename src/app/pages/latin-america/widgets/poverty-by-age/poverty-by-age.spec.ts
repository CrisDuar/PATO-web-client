import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PovertyByAge } from './poverty-by-age';

describe('PovertyByAge', () => {
  let component: PovertyByAge;
  let fixture: ComponentFixture<PovertyByAge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PovertyByAge],
    }).compileComponents();

    fixture = TestBed.createComponent(PovertyByAge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
