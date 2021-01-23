import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  // output string for how long execution took
  functionTimer: number;
  // subscrptions
  subscriptions: Subscription[] = [];

  constructor(private apiService: ApiService) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(this.apiService.functionTimer.subscribe((time: number) => {
      this.functionTimer = time;
    }));
  }

}
