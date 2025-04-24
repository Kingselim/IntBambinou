import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conversation } from 'src/app/model/Conversation';
@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  private apiUrl = 'http://localhost:8089/conversation'; // Remplace par ton URL backend

  constructor(private http: HttpClient) {}

  // Récupérer toutes les conversations
  getAllConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${this.apiUrl}/retrieve-all-conversations`);
  }

  // Récupérer une conversation par ID
  getConversationById(conversationId: number): Observable<Conversation> {
    return this.http.get<Conversation>(`${this.apiUrl}/${conversationId}`);
  }

  // Ajouter une nouvelle conversation
  addConversation(conversation: Conversation): Observable<Conversation> {
    return this.http.post<Conversation>(`${this.apiUrl}/add-conversation`, conversation);
  }

  // Supprimer une conversation par ID
  deleteConversation(conversationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove-conversation/${conversationId}`);
  }

  // Modifier une conversation
  updateConversation(conversation: Conversation): Observable<Conversation> {
    return this.http.put<Conversation>(`${this.apiUrl}/modify-conversation`, conversation);
  }

  // Ajouter un utilisateur à une conversation
  addUserToConversation(conversationId: number, userId: number): Observable<Conversation> {
    return this.http.post<Conversation>(`${this.apiUrl}/add-user/${conversationId}/user/${userId}`, {});
  }

  // Supprimer un utilisateur d'une conversation
  removeUserFromConversation(conversationId: number, userId: number): Observable<Conversation> {
    return this.http.delete<Conversation>(`${this.apiUrl}/remove-user/${conversationId}/user/${userId}`);
  }

  getConversationsByUser(userId: number): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${this.apiUrl}/user/${userId}`);
  }
}
