import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionViewer } from './prediction-viewer';

describe('PredictionViewer', () => {
  let component: PredictionViewer;
  let fixture: ComponentFixture<PredictionViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictionViewer],
    }).compileComponents();

    fixture = TestBed.createComponent(PredictionViewer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
