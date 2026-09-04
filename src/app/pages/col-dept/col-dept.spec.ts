import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColDept } from './col-dept';

describe('ColDept', () => {
  let component: ColDept;
  let fixture: ComponentFixture<ColDept>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColDept],
    }).compileComponents();

    fixture = TestBed.createComponent(ColDept);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
