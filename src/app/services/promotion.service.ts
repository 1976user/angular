import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';

import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseURL';

import { ProcessHTTPMessageService } from './process-httpmessage.service'

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(
    private http: HttpClient,
    private processHTTPMessageService: ProcessHTTPMessageService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions')
        .pipe(catchError(this.processHTTPMessageService.handleError));
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions?id=' + id)
        .pipe(map(promotions => promotions[0]))
        .pipe(catchError(this.processHTTPMessageService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true')
        .pipe(map(promotions => promotions[0]))
        .pipe(catchError(this.processHTTPMessageService.handleError));
  }
}