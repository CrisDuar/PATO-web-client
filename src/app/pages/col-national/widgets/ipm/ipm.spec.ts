import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ipm } from './ipm';

describe('Ipm', () => {
  let component: Ipm;
  let fixture: ComponentFixture<Ipm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ipm],
    }).compileComponents();

    fixture = TestBed.createComponent(Ipm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
