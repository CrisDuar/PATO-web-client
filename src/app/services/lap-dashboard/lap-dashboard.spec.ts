import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LAPDashboard } from './lap-dashboard';

describe('LAPDashboard', () => {
  let component: LAPDashboard;
  let fixture: ComponentFixture<LAPDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LAPDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(LAPDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
