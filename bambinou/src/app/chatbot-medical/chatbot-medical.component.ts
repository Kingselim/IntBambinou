import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chatbot-medical',
  templateUrl: './chatbot-medical.component.html',
  styleUrls: ['./chatbot-medical.component.css']
})
export class ChatbotMedicalComponent {
  @Input() message: string = '';
  isOpen = true;

  userQuestion: string = '';
  chatMessages: { sender: 'user' | 'bot', text: string }[] = [];
  loading = false;

  constructor(private http: HttpClient) {}

  closeChat() {
    this.isOpen = false;
  }

  askQuestion(question?: string) {
    const finalQuestion = question?.trim() || this.userQuestion.trim();
    if (!finalQuestion) return;

    this.chatMessages.push({ sender: 'user', text: finalQuestion });
    this.loading = true;

    this.http.post<any>('http://localhost:8089/chatbot/ask', {
      question: finalQuestion
    }).subscribe({
      next: (res) => {
        this.chatMessages.push({ sender: 'bot', text: res.response });
        this.userQuestion = '';
        this.loading = false;
      },
      error: () => {
        this.chatMessages.push({ sender: 'bot', text: '❌ Erreur de l\'IA, veuillez réessayer.' });
        this.loading = false;
      }
    });
  }
}
