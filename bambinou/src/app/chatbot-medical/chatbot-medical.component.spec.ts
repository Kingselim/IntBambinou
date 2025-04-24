import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotMedicalComponent } from './chatbot-medical.component';

describe('ChatbotMedicalComponent', () => {
  let component: ChatbotMedicalComponent;
  let fixture: ComponentFixture<ChatbotMedicalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatbotMedicalComponent]
    });
    fixture = TestBed.createComponent(ChatbotMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
