import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PregnancyJournal } from '../model/PregnancyJournal';
@Injectable({
  providedIn: 'root'
})
export class PregnancyJournalService {

  private baseUrl = 'http://localhost:8089/journal';

  constructor(private http: HttpClient) {}

  saveJournal(journal: PregnancyJournal): Observable<PregnancyJournal> {
    return this.http.post<PregnancyJournal>(this.baseUrl, journal);
  }

  getAllJournals(): Observable<PregnancyJournal[]> {
    return this.http.get<PregnancyJournal[]>(this.baseUrl);
  }
  uploadImage(formData: FormData): Observable<PregnancyJournal> {
    return this.http.post<PregnancyJournal>('http://localhost:8089/journal/upload-image', formData);
  }
  updateJournal(id: number, formData: FormData): Observable<PregnancyJournal> {
    return this.http.put<PregnancyJournal>(`http://localhost:8089/journal/${id}`, formData);
  }
  deleteJournal(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8089/journal/${id}`);
  }
  getByTrackingId(id: number): Observable<PregnancyJournal[]> {
    return this.http.get<PregnancyJournal[]>(`${this.baseUrl}/tracking/${id}`);
  }
}
