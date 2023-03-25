import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../Models/iorder.model';
import { OrderService } from '../../Services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: IOrder[] | undefined = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(data => this.orders = data);
  }

  /*
  private async getAllOrders() {
    const ordersList = await this.orderService.getAllOrders();
    this.orders = ordersList;
  }
  */

}
