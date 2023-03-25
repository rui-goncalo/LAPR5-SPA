import { Injectable } from '@angular/core';
import {map} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IPlanningRoute} from "../Models/iplanningroute.model";
import {IRoute} from "../Models/iroute.model";

@Injectable({
  providedIn: 'root'
})
export class PlanningRouteService {
  planningRouteURL = 'http://localhost:3000/api/planningRoute/';


  constructor(private http: HttpClient) { }

  getBestRoute(truckId: string, date: string) {
    return this.http.get(this.planningRouteURL + 'getBestRoute/' + date + '/' + truckId).pipe(map(this.allData));
  }

  getHDist(truckId: string, date: string) {
    return this.http.get(this.planningRouteURL + 'getHDist/' + date + '/' + truckId).pipe(map(this.allData));
  }

  getHMassa(truckId: string, date: string) {
    return this.http.get(this.planningRouteURL + 'getHMassa/' + date + '/' + truckId).pipe(map(this.allData));
  }

  getHMassaTempo(truckId: string, date: string) {
    return this.http.get(this.planningRouteURL + 'getHMassaTempo/' + date + '/' + truckId).pipe(map(this.allData));
  }

  getAlgGen(truckId: string, date: string) {
    return this.http.get(this.planningRouteURL + 'getAlgGen/' + date + '/' + truckId).pipe(map(this.allData));
  }

  private allData(res: any) {
    return res || {};
  }

}
