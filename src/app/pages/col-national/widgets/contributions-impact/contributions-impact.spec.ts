import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionsImpact } from './contributions-impact';

describe('ContributionsImpact', () => {
  let component: ContributionsImpact;
  let fixture: ComponentFixture<ContributionsImpact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContributionsImpact],
    }).compileComponents();

    fixture = TestBed.createComponent(ContributionsImpact);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
