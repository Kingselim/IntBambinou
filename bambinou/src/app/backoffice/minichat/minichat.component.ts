import { Component, ViewChild, ElementRef } from '@angular/core';
import { MinichatService } from '../service/minichat.service';
@Component({
  selector: 'app-minichat',
  templateUrl: './minichat.component.html',
  styleUrls: ['./minichat.component.css']
})
export class MinichatComponent {
  userMessage: string = '';
  chatHistory: { message: string; from: string }[] = [];

  botResponse: string = '';
  showChat = false;

  messages: { sender: 'user' | 'bot', text: string }[] = [];
  constructor(private minichatService: MinichatService) {}
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  toggleChat() {
    this.showChat = !this.showChat;
  }
  sendMessage() {
    const message = this.userMessage.trim();
    if (!message) return;

    // Ajouter le message de l'utilisateur
    this.messages.push({ sender: 'user', text: message });


    this.minichatService.sendMessage(this.userMessage).subscribe(
      (response) => {
        this.botResponse = response.response;  // Réponse de ton serveur Flask
        this.messages.push({ sender: 'bot', text: response.response });
        this.userMessage = '';  // Effacer le champ de message après envoi
        this.scrollToBottom();  // <- ICI

      },
      (error) => {
        console.error('Erreur lors de l\'envoi du message :', error);
      }
    );
  
// Nettoyer le champ
    this.userMessage = '';
    
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error("Erreur de défilement", err);
    }
  }
}
