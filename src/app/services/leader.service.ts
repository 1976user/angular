import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

import { returnAfterTimeout } from './timeoutTester';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Leader[]> {
  	return new Promise(returnAfterTimeout(LEADERS, 2000));
  }

  getLeader(id: string): Promise<Leader> {
  	return new Promise(
      returnAfterTimeout(
        LEADERS.filter(leader => leader.id == id)[0],
        2000));
  }

  getFeaturedLeader(): Promise<Leader> {
  	return new Promise(
      returnAfterTimeout(
        LEADERS.filter(leader => leader.featured)[0],
        2000));
  }
}
