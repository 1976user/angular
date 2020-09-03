import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Observable<Promotion[]> {
    return of(PROMOTIONS).pipe(delay(2000));
  }

  getPromotion(id: string): Observable<Promotion> {
    const promotion = PROMOTIONS.filter(promo => promo.id === id)[0];
    return of(promotion).pipe(delay(2000));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    const promotion = PROMOTIONS.filter(promotion => promotion.featured)[0];
    return of(promotion).pipe(delay(2000));
  }
}