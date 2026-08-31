import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarDeprivations } from './radar-deprivations';

describe('RadarDeprivations', () => {
  let component: RadarDeprivations;
  let fixture: ComponentFixture<RadarDeprivations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadarDeprivations],
    }).compileComponents();

    fixture = TestBed.createComponent(RadarDeprivations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
