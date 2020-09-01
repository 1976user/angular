import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

import { returnAfterTimeout } from './timeoutTester';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]> {
  	return new Promise(
      returnAfterTimeout(DISHES, 2000));
  }

  getDish(id: string): Promise<Dish> {
  	return new Promise(
      returnAfterTimeout(
          DISHES.filter(dish => dish.id === id)[0],
          2000));
  }

  getFeaturedDish(): Promise<Dish> {
  	return new Promise(
      returnAfterTimeout(
        DISHES.filter(dish => dish.featured)[0],
        2000));
  }
}