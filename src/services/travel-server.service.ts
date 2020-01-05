import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Fare} from '../model/fare';
import {Airport} from '../model/airport';
import {Statistics} from '../model/statistics';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TravelServerService {

  constructor(private http: HttpClient) {}

  fare(origin: string, destination: string): Observable<Fare> {
    return this.http.get<Fare>(environment.backendUrl + `/travel/v1/fares/${origin}/${destination}`);
  }

  // This is workaround for not working simple-travel-api-mock search term, that searches through code, name and description.
  search(term: string): Observable<Airport[]> {
    return this.http.get<Airport[]>(environment.backendUrl + '/travel/v1/airports')
      .pipe(map((response: any) => {
          return response._embedded.locations
            .filter(airport => airport.code.toUpperCase().includes(term));
        })
      );
  }

  statistics(): Observable<Statistics> {
    return this.http.get<Statistics>(environment.backendUrl + '/travel/statistics');
  }
}
