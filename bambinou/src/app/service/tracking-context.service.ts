import { Injectable } from '@angular/core';

@Injectable({

  providedIn: 'root'

})

export class TrackingContextService {

 

  private idPregnancyTracking: number | null = null;

 

  setId(id: number) {

    this.idPregnancyTracking = id;

  }

 

  getId(): number | null {

    return this.idPregnancyTracking;

  }}
