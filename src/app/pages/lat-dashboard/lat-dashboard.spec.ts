import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LATDashboard } from './lat-dashboard';

describe('LATDashboard', () => {
  let component: LATDashboard;
  let fixture: ComponentFixture<LATDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LATDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(LATDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
