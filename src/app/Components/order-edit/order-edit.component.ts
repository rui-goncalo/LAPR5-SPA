import {Component, OnInit, ViewChild} from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { NgForm } from "@angular/forms";
import {IDelivery} from "../../Models/idelivery.model";
import {IOrder} from "../../Models/iorder.model";

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {
  public successMessage = '';
  public errorMessage = '';
  public orderEdit: boolean | undefined;
  //private userId: any;
  //public user = {} as IUser;
  orders: IOrder[] | undefined = [];
  @ViewChild('orderForm') form: NgForm | undefined;
  editMode: boolean = false;
  // @ts-ignore
  currentOrderId: string;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(data => this.orders = data);
  }

  editOrder(form: NgForm) {
    this.orderService.editOrderById({
      orderId: this.currentOrderId,
      orderDescription: form.value.orderDescription,
    }).subscribe((data: any) => {
      this.orderEdit = true
      this.successMessage = "Order edited successfully!"
      this.refresh()
    }, (error: { message: string; }) => {
      this.orderEdit = false;
      this.errorMessage = error.message;
    })
  }

  onEditClicked(orderId: string) {
    this.currentOrderId = orderId;

    //get the delivery ID
    let currentOrder = this.orders?.find((order) => {
      return order.orderId === orderId
    })
    console.log(currentOrder);

    //populate the form with the delivery details
    this.form?.setValue({
      // @ts-ignore
      orderDescription: currentOrder.orderDescription
    });

    //Button value to be able to click
    this.editMode = true;
  }

  private refresh() {
    window.location.reload();
  }

}
