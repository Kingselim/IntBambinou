import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface Alimentation {
  idNutrition?: number;
  recommendation: string;
  description: string;
  nbFollowers: number;
  calories: number;
  protein: number;
  glucide: number;
  lipide: number;
  vitamin: number;
  userName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlimentationService {
  private readonly API_URL = 'http://localhost:8089/nutrition';
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true // Include if your backend requires credentials
  };

  constructor(private http: HttpClient) { }

  // Fetch all alimentation entries
  getAllAlimentation(): Observable<Alimentation[]> {
    return this.http.get<Alimentation[]>(`${this.API_URL}/retrieve-all`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  // Get single entry by ID
  getAlimentationById(id: number): Observable<Alimentation> {
    return this.http.get<Alimentation>(`${this.API_URL}/retrieve/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Create new entry
  addAlimentation(alimentation: Alimentation): Observable<Alimentation> {
    // Create a clean payload with only required fields
    const payload = {
      recommendation: alimentation.recommendation,
      description: alimentation.description,
      nbFollowers: alimentation.nbFollowers || 0,
      calories: alimentation.calories,
      protein: alimentation.protein,
      glucide: alimentation.glucide,
      lipide: alimentation.lipide,
      vitamin: alimentation.vitamin,
      userName: alimentation.userName 
    };
  
    return this.http.post<Alimentation>(
      `${this.API_URL}/add`,
      payload,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
        withCredentials: true
      }
    ).pipe(
      catchError(error => {
        console.error('Detailed error:', error);
        if (error.status === 500) {
          return throwError(() => new Error('Server error: Please check the data and try again'));
        }
        return this.handleError(error);
      })
    );
  }

  // Update existing entry - CORRECTED VERSION
  updateAlimentation(alimentation: Alimentation): Observable<Alimentation> {
    return this.http.put<Alimentation>(
      `${this.API_URL}/modify/${alimentation.idNutrition}`, // Matches your @PutMapping
      alimentation, // Send full object as body
      this.httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  // Delete entry - CORRECTED VERSION
  deleteAlimentation(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.API_URL}/remove/${id}`, // Matches your @DeleteMapping
      this.httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server error ${error.status}: ${error.message}`;
      if (error.error?.message) {
        errorMessage += ` - ${error.error.message}`;
      }
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}