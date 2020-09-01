import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

import { returnAfterTimeout } from './timeoutTester';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Promotion[]> {
    return new Promise(returnAfterTimeout(PROMOTIONS, 2000));
  }

  getPromotion(id: string): Promise<Promotion> {
    return new Promise(
      returnAfterTimeout(
        PROMOTIONS.filter(promo => promo.id === id)[0],
        2000));
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return new Promise(
      returnAfterTimeout(
        PROMOTIONS.filter(promotion => promotion.featured)[0],
        2000));
  }
}