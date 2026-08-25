import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetAccess } from './internet-access';

describe('InternetAccess', () => {
  let component: InternetAccess;
  let fixture: ComponentFixture<InternetAccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternetAccess],
    }).compileComponents();

    fixture = TestBed.createComponent(InternetAccess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
