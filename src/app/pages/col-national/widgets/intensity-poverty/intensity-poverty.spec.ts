import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntensityPoverty } from './intensity-poverty';

describe('IntensityPoverty', () => {
  let component: IntensityPoverty;
  let fixture: ComponentFixture<IntensityPoverty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntensityPoverty],
    }).compileComponents();

    fixture = TestBed.createComponent(IntensityPoverty);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
