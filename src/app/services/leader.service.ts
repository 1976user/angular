import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Leader } from '../shared/leader';

import { baseURL } from '../shared/baseURL';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ProcessHTTPMessageService } from './process-httpmessage.service'

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(
    private http: HttpClient,
    private processHTTPMessageService: ProcessHTTPMessageService) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leadership')
      .pipe(catchError(this.processHTTPMessageService.handleError));
  }

  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leadership?id=' + id)
      .pipe(map(leaders => leaders[0]))
      .pipe(catchError(this.processHTTPMessageService.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leadership?featured=true')
      .pipe(map(leaders => leaders[0]))
      .pipe(catchError(this.processHTTPMessageService.handleError));
  }
}
