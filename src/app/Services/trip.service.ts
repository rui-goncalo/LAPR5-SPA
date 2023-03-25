import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ITrip} from "../Models/itrip.model";
import {Observable} from "rxjs";
import {IRoute} from "../Models/iroute.model";

@Injectable({
  providedIn: 'root'
})
export class TripService {
  tripURL = 'https://lei-nodejs-016.onrender.com/api/trip/';
  // tripURL = 'http://localhost:3000/api/trip/';

  constructor(private http: HttpClient) { }

  addTrip(trip: ITrip): Observable<ITrip> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<ITrip>(this.tripURL, trip, { headers });
  }

  getAllTrips() {
    return this.http.get<ITrip[]>(this.tripURL);
  }
}
