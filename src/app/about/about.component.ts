import { Component, OnInit, Inject } from '@angular/core';

import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

import { baseURL } from '../shared/baseURL';

import { flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders: Leader[];
  leadersErrMsg: string;

  constructor(
    private leaderService: LeaderService,
    @Inject('BaseURL')private baseURL: string) { }

  ngOnInit() {
  	this.leaderService.getLeaders().subscribe(
      leaders => this.leaders = leaders,
      errMsg => this.leadersErrMsg = errMsg);
  }

}
