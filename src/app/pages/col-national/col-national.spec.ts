import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColNational } from './col-national';

describe('ColNational', () => {
  let component: ColNational;
  let fixture: ComponentFixture<ColNational>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColNational],
    }).compileComponents();

    fixture = TestBed.createComponent(ColNational);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
