import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PregnancyTrackings} from '../model/PregnancyTracking';

@Injectable({
  providedIn: 'root'
})
export class PregnancyTrackingService {

  private apiUrl = 'http://localhost:8089/pregnancy-tracking';
  constructor(private http: HttpClient) { }

 /* getAllPregnancyTrackings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/retrieve-all`);
  }*/
  getAllPregnancyTrackings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/retrieve-all`).pipe(
      map(data => 
        data.map(item => {
          const date = new Date(item.DatePregnancyTracking);
          return {
            ...item,
            DatePregnancyTracking: isNaN(date.getTime()) ? null : date
          };
        })
      )
    );
  }
    //getAllPregnancyTrackings(): Observable<any[]> {
      //return this.http.get<any[]>("http://localhost:8089/pregnancy-tracking/retrieve-all");
    //}
    
  /*addPregnancyTracking(trackingData: PregnancyTrackings): Observable<PregnancyTrackings> {
    console.log('je suis la',trackingData)
    return this.http.post<any>(`${this.apiUrl}/add`, trackingData);
  }*/

    getPregnancyTrackingById(id: number): Observable<PregnancyTrackings> {
      return this.http.get<PregnancyTrackings>(`http://localhost:8089/pregnancy-tracking/retrieve/${id}`);
    }
  addPregnancyTracking(trackingData: PregnancyTrackings): Observable<PregnancyTrackings> {
    return this.http.post<PregnancyTrackings>(
      'http://localhost:8089/pregnancy-tracking/add',
      trackingData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
  
}
