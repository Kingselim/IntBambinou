import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from 'src/app/model/Message';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:8089/message'; // Remplace par ton URL backend

  constructor(private http: HttpClient) {}

  // Récupérer tous les messages
  getAllMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/all`);
  }

  // Récupérer un message par ID
  getMessageById(messageId: number): Observable<Message> {
    return this.http.get<Message>(`${this.apiUrl}/${messageId}`);
  }

  // Ajouter un nouveau message
  addMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/add`, message);
  }

  // Supprimer un message par ID
  deleteMessage(messageId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove-message/${messageId}`);
  }

  // Modifier un message
  updateMessage(message: Message): Observable<Message> {
    return this.http.put<Message>(`${this.apiUrl}/update`, message);
  }

  // Ajouter un message à une conversation
  addMessageToConversation(conversationId: number, senderId: number, content: string): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/add-message-to-conversation/${conversationId}/sender/${senderId}`, { message: content });
  }

   // Récupérer tous les messages d'une conversation
   getMessagesByConversation(conversationId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/conversation/${conversationId}`);
  }

}
