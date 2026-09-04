import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatinAmerica } from './latin-america';

describe('LatinAmerica', () => {
  let component: LatinAmerica;
  let fixture: ComponentFixture<LatinAmerica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatinAmerica],
    }).compileComponents();

    fixture = TestBed.createComponent(LatinAmerica);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
