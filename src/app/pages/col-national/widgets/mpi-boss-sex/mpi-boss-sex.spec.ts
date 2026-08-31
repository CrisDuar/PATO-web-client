import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpiBossSex } from './mpi-boss-sex';

describe('MpiBossSex', () => {
  let component: MpiBossSex;
  let fixture: ComponentFixture<MpiBossSex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpiBossSex],
    }).compileComponents();

    fixture = TestBed.createComponent(MpiBossSex);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
