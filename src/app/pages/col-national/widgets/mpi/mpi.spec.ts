import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mpi } from './mpi';

describe('Mpi', () => {
  let component: Mpi;
  let fixture: ComponentFixture<Mpi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mpi],
    }).compileComponents();

    fixture = TestBed.createComponent(Mpi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
