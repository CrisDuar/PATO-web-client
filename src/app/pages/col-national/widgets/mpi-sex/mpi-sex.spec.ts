import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpiSex } from './mpi-sex';

describe('MpiSex', () => {
  let component: MpiSex;
  let fixture: ComponentFixture<MpiSex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpiSex],
    }).compileComponents();

    fixture = TestBed.createComponent(MpiSex);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
