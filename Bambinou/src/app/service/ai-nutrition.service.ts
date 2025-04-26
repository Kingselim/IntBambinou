import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AiNutritionService {
  private apiUrl = 'http://localhost:5001/generate-recommendation';

  constructor(private http: HttpClient) {}

  generateRecommendation(data: any) {
    return this.http.post<{ recommendation: string }>(this.apiUrl, data);
  }
}