import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { IOrder } from '../Models/iorder.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderURL = 'https://dotnet016.azurewebsites.net/api/orders';
  // orderURL = 'https://localhost:5001/api/Orders';

  constructor(private http: HttpClient) { }

  addOrder(order : IOrder) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<IOrder>(this.orderURL, order, { headers });
  }

  getAllOrders() {
    return this.http.get<IOrder[]>(this.orderURL);
  }

  editOrder(order: IOrder) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<IOrder>(this.orderURL, order, { headers });
  }

  editOrderById(order: IOrder) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<IOrder>(this.orderURL + "/" + order.orderId, order, { headers });
  }

}
