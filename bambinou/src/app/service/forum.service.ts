import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Forum } from '../model/Forum';
export interface Task {
  text: string;
  status: 'todo' | 'inProgress' | 'done';
  date?: string;
  time?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ForumService {
 private apiUrl = 'http://localhost:8089/forum';
 public trackings: Forum[] = [];
 currentMonthlyForm: Partial<Forum> | null = null;
 public tasks: Task[] = [];
  constructor(private http: HttpClient) { }

  /*getAllForums(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/retrieve-all`);
  }*/
  getAllForums(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8089/forum/retrieve-all');
  }
  
  setTrackings(trackings: Forum[]) {
    this.trackings = [...trackings];
  }
  
  getCachedTrackings(): Forum[] {
    return [...this.trackings];
  }

  addForum(forum: Forum): Observable<Forum> {
    console.log('je suis laaa',forum)
    return this.http.post<Forum>(`${this.apiUrl}/add`, forum);
  }
  
  getForumsByPregnancy(idPregnancyTracking: number): Observable<Forum[]> {
    return this.http.get<Forum[]>(`${this.apiUrl}/by-pregnancy/${idPregnancyTracking}`);
  }
  updateForum(id: number, forum: Forum): Observable<Forum> {
    return this.http.put<Forum>(`${this.apiUrl}/modify/${id}`, forum);
  }
  analyzeSymptomsByForum(idForum: number) {
    return this.http.get<any>(`http://localhost:8089/ia/predict-disease-by-forum/${idForum}`);
  }
  
  // pregnancy-tracking.service.ts
getInterpretation(id: number): Observable<string> {
  return this.http.get(`http://localhost:8089/pregnancy-tracking/interpret/${id}`, { responseType: 'text' });
}
checkChatbotAlert(id: number) {
  return this.http.get(`http://localhost:8089/ia/chatbot-alert/${id}`);
}

}
