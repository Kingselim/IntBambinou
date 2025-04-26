import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NutritionService {
  private apiUrl = 'http://localhost:8089/nutrition'; // 🔁 adapte si différent

  constructor(private http: HttpClient) {}

  getDeficiencyReport(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/deficiency-report/${userId}`);
  }
}