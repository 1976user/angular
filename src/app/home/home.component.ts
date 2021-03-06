import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { Leader } from '../shared/leader';

import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';

import { flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;

  dishErrMsg: string;
  promotionErrMsg: string;
  leaderErrMsg: string;

  constructor(
  	private dishService: DishService,
  	private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') private baseURL: string) { }

  ngOnInit() {
  	this.dishService.getFeaturedDish().subscribe(dish => this.dish = dish, errMsg => this.dishErrMsg = <any>errMsg);
  	this.promotionService.getFeaturedPromotion().subscribe(
      promotion => { this.promotion = promotion; console.log(JSON.stringify(promotion)); },
      errMsg => this.promotionErrMsg = <any>errMsg);
    this.leaderService.getFeaturedLeader().subscribe(
      leader => this.leader =  leader,
      errMsg => this.leaderErrMsg = errMsg);
  }

}
