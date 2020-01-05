import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {Fare} from '../../model/fare';
import {Airport} from '../../model/airport';
import {TravelServerService} from '../../services/travel-server.service';

@Component({
  selector: 'app-fare-details',
  templateUrl: './fare-details.component.html',
  styleUrls: ['./fare-details.component.css']
})
export class FareDetailsComponent implements OnInit, OnDestroy, OnChanges {

  @Input() origin: Airport;
  @Input() destination: Airport;

  fare: Fare = null;
  isFetching = true;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private travelServerService: TravelServerService) { }

  ngOnInit() {
    this.retrieveFare();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.retrieveFare();
  }

  private retrieveFare() {
    if (this.origin != null && this.destination != null) {
      this.fetchFare();
    }
  }

  private fetchFare() {
    this.isFetching = true;
    this.travelServerService.fare(this.origin.code, this.destination.code)
      .pipe(
        tap( () => (this.isFetching = false)),
        takeUntil(this.destroy$))
      .subscribe(data => {
        this.fare = data;
      });
  }
}
