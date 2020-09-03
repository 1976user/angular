import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Observable<Dish[]> {
  	return of(DISHES).pipe(delay(2000));
  }

  getDish(id: string): Observable<Dish> {
    const dish = DISHES.filter(dish => dish.id === id)[0];
  	return of(dish).pipe(delay(2000));
  }

  getFeaturedDish(): Observable<Dish> {
    const dish = DISHES.filter(dish => dish.featured)[0];
  	return of(dish).pipe(delay(2000));
  }

  getDishIds(): Observable<string[] | any> {
    return of(DISHES.map(dish => dish.id)).pipe(delay(2000));
  }
}