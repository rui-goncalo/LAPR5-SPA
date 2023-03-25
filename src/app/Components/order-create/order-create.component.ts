import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {OrderService} from '../../Services/order.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {

  public successMessage = '';
  public errorMessage = '';
  public orderCreated: boolean | undefined;
  //private userId: any;
  //public user = {} as IUser;
  public arr: any;
  public lengthArr: any;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }

  addOrder(form: NgForm) {
    //increment orderID
    let finalId;
    let finalId2;
    let aux = 0;
    let finalIdOrder = '';

    this.arr = this.orderService.getAllOrders().subscribe((data: any) => {
      this.arr = data;
      this.lengthArr = this.arr.length;

      if (this.arr.length === 0) {
        finalId2 = 1;
      } else {
        for (let i=0; i<this.arr.length; i++) {
          if (parseInt(this.arr.at(i).orderId) > aux) {
            aux = parseInt(this.arr.at(i).orderId);
          }
        }
        finalId = aux;
        // @ts-ignore
        finalId2 = (parseInt(finalId) + 1).toString();
      }
      finalIdOrder=JSON.stringify(finalId2);

      this.orderService.addOrder({
        orderId: finalIdOrder,
        orderDescription: form.value.orderDescription
      }
      ).subscribe((data: any) => {
        this.orderCreated = true
        this.successMessage = "Order created successfully!"
        this.refresh()
      }, (error: { message: string; }) => {
        this.orderCreated = false;
        this.errorMessage = error.message;
      })
    });
  }

  refresh(): void {
    window.location.reload();
  }

}
