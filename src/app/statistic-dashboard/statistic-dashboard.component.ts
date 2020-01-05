import { Component, OnInit, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';

import {Statistics} from '../../model/statistics';
import {TravelServerService} from '../../services/travel-server.service';

@Component({
  selector: 'app-statistic-dashboard',
  templateUrl: './statistic-dashboard.component.html',
  styleUrls: ['./statistic-dashboard.component.css']
})
export class StatisticDashboardComponent implements OnInit, OnDestroy {

  statistics: Statistics;
  isLoading = true;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private travelServerService: TravelServerService) { }

  ngOnInit() {
    this.travelServerService.statistics()
      .pipe(
        tap(() => (this.isLoading = false)),
        takeUntil(this.destroy$))
      .subscribe(data => {
        this.statistics = data;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
