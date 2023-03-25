import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IRoute} from "../Models/iroute.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  routeURL = 'https://lei-nodejs-016.onrender.com/api/routes/';
  warehouseURL = 'https://dotnet016.azurewebsites.net/api/Warehouses';
  //routeURL = 'http://localhost:3000/api/routes/';
  //warehouseURL = 'https://localhost:5001/api/Warehouses';

  constructor(private http: HttpClient) { }

  addRoute(route: IRoute): Observable<IRoute> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<IRoute>(this.routeURL, route, { headers });
  }

  getAllRoutes() {
    return this.http.get<IRoute[]>(this.routeURL);
  }

  editRoute(route: IRoute) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<IRoute>(this.routeURL, route, { headers });
  }

  getWarehousesLocation(): Observable<any[]> {
    return this.http.get<any>(this.warehouseURL);
  }
}
