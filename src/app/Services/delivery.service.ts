import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { IDelivery } from '../Models/idelivery.model';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  deliveryURL = 'https://dotnet016.azurewebsites.net/api/Deliveries';
  warehouseURL = 'https://dotnet016.azurewebsites.net/api/Warehouses';
  // deliveryURL = 'https://localhost:5001/api/Deliveries';
  // warehouseURL = 'https://localhost:5001/api/Warehouses';

  constructor(private http: HttpClient) { }

  addDelivery(delivery : IDelivery) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<IDelivery>(this.deliveryURL, delivery, { headers });
  }

  getAllDeliveries() {
    return this.http.get<IDelivery[]>(this.deliveryURL);
  }

  editDelivery(delivery: IDelivery) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<IDelivery>(this.deliveryURL, delivery, { headers });
  }

  editDeliveryById(delivery: IDelivery) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<IDelivery>(this.deliveryURL + "/" + delivery.deliveryId, delivery, { headers });
  }

  getWarehousesLocation(): Observable<any[]> {
    return this.http.get<any>(this.warehouseURL);
  }
}
