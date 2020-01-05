import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {debounceTime, finalize, switchMap, takeUntil, tap} from 'rxjs/operators';
import {Airport} from '../../model/airport';
import {TravelServerService} from '../../services/travel-server.service';

@Component({
  selector: 'app-airport-code',
  templateUrl: './airport-code.component.html',
  styleUrls: ['./airport-code.component.css']
})
export class AirportCodeComponent implements OnInit, OnDestroy {

  @Output() airportEventEmitter = new EventEmitter<Airport>();

  isLoading = false;
  errorMsg: string;
  filteredAirports: Airport[];
  airportsFormControl = new FormControl();

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private travelServerService: TravelServerService) {
  }

  ngOnInit() {
    this.travelServerService.search('', 0)
      .subscribe(data => {
        this.filteredAirports = data;
        this.errorMsg = '';
      });
    this.airportsFormControl.valueChanges
      .pipe(debounceTime(1000), tap(() => {
          this.isLoading = true;
          this.filteredAirports = [];
          this.errorMsg = '';
        }),
        switchMap(value => this.travelServerService.search(value, 1)
          .pipe(finalize(() => {
              this.isLoading = false;
            }),
          )
        ), takeUntil(this.destroy$))
      .subscribe(data => {
        if (data === undefined) {
          this.filteredAirports = [];
          this.errorMsg = 'Unable to load airport data';
        } else {
          this.filteredAirports = data;
          this.errorMsg = '';
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  onOptionSelected() {
    this.airportEventEmitter.emit(this.airportsFormControl.value);
  }

  onTextRemoved() {
    this.airportsFormControl.setValue('');
    this.airportEventEmitter.emit(null);
  }

  displayFn(value: Airport) {
    return value == null ? '' : value.code;
  }

}
