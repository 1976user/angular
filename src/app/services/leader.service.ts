import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Leader[]> {
    return of(LEADERS).pipe(delay(2000));
  }

  getLeader(id: string): Observable<Leader> {
    const leader = LEADERS.filter(leader => leader.id == id)[0];
    return of(leader).pipe(delay(2000));
  }

  getFeaturedLeader(): Observable<Leader> {
    const leader = LEADERS.filter(leader => leader.featured)[0];
    return of(leader).pipe(delay(2000));
  }
}
