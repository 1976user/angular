import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { baseURL } from '../shared/baseURL';
import { Feedback } from '../shared/feedback';

import { ProcessHTTPMessageService } from './process-httpmessage.service';

import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
  	private http: HttpClient,
  	private processHTTPMessageService: ProcessHTTPMessageService) { }

  submitFeedback(feedback: Feedback) {
  	const httpOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    return this.http.post<Feedback>(baseURL + 'feedback', feedback, httpOptions)
      .pipe(catchError(this.processHTTPMessageService.handleError));
  }
}
