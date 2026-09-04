import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MPHouseholdsDep } from './mp-households-dep';

describe('MPHouseholdsDep', () => {
  let component: MPHouseholdsDep;
  let fixture: ComponentFixture<MPHouseholdsDep>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MPHouseholdsDep],
    }).compileComponents();

    fixture = TestBed.createComponent(MPHouseholdsDep);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
