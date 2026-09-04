import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionDeprivations } from './contribution-deprivations';

describe('ContributionDeprivations', () => {
  let component: ContributionDeprivations;
  let fixture: ComponentFixture<ContributionDeprivations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContributionDeprivations],
    }).compileComponents();

    fixture = TestBed.createComponent(ContributionDeprivations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
