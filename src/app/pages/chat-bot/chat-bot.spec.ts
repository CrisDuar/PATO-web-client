import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBOT } from './chat-bot';

describe('ChatBOT', () => {
  let component: ChatBOT;
  let fixture: ComponentFixture<ChatBOT>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatBOT],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatBOT);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
