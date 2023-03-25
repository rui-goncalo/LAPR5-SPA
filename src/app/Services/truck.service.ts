import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ITruck} from "../Models/itruck.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TruckService {
  truckURL = 'https://lei-nodejs-016.onrender.com/api/trucks';
  // truckURL = 'http://localhost:3000/api/trucks';

  constructor(private http: HttpClient) { }

  addTruck(truck : ITruck) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<ITruck>(this.truckURL, truck, { headers });
  }

  /*
  getAllTrucks() {
    return this.http.get<ITruck[]>(this.truckURL);
  }

   */
  getTruckById(truckId : string){
    return this.http.get<ITruck>(this.truckURL+ "/" + truckId);
  }

  getAllTrucks(): Observable<any[]> {
    return this.http.get<any>(this.truckURL);
  }

  //truck turns inactivated
    markTruckAsInactive(truck: ITruck){
      const headers = { 'Content-Type': 'application/json' };
      return this.http.patch<ITruck>(this.truckURL + "/inactivate/" + truck.truckId, truck, { headers });
    }

    //truck turns inactivated
    markTruckAsactive(truck: ITruck){
      const headers = { 'Content-Type': 'application/json' };
      return this.http.patch<ITruck>(this.truckURL + "/activate/" + truck.truckId, truck, { headers });
    }

    checkActivatedTruck(truckId : string){
      return this.http.get<boolean>(this.truckURL+ "/check/" + truckId);
    }

}
