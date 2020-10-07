import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http'
import { baseURL } from '../shared/baseURL';

import { ProcessHTTPMessageService } from './process-httpmessage.service'

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient,
    private processHTTPMessageService: ProcessHTTPMessageService) { }

  getDishes(): Observable<Dish[]> {
  	return this.http.get<Dish[]>(baseURL + 'dishes')
        .pipe(catchError(this.processHTTPMessageService.handleError));
  }

  getDish(id: string): Observable<Dish> {
  	return this.http.get<Dish>(baseURL + 'dishes/' + id);
  }

  getFeaturedDish(): Observable<Dish> {
  	return this.http.get<Dish[]>(baseURL + 'dishees?featured=true')
        .pipe(map(dishes => dishes[0]))
        .pipe(catchError(this.processHTTPMessageService.handleError));
  }

  getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
        .pipe(catchError(error => error));
  }
}