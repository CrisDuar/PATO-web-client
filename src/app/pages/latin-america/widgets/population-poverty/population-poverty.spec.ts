import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationPoverty } from './population-poverty';

describe('PopulationPoverty', () => {
  let component: PopulationPoverty;
  let fixture: ComponentFixture<PopulationPoverty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopulationPoverty],
    }).compileComponents();

    fixture = TestBed.createComponent(PopulationPoverty);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
