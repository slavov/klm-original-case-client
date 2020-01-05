import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule, MatCardModule, MatButtonToggleModule, MatSidenavModule, MatIconModule, MatListModule,
  MatProgressBarModule, MatButtonModule, MatToolbarModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FareDashboardComponent } from './fare-dashboard/fare-dashboard.component';
import { FareDetailsComponent } from './fare-details/fare-details.component';
import { StatisticDashboardComponent } from './statistic-dashboard/statistic-dashboard.component';
import { AirportCodeComponent } from './airport-code/airport-code.component';
import {TravelServerService} from '../services/travel-server.service';

@NgModule({
  declarations: [
    AppComponent,
    FareDashboardComponent,
    FareDetailsComponent,
    StatisticDashboardComponent,
    AirportCodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule
  ],
  providers: [TravelServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
