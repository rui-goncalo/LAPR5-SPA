import { DeliveryService } from './../../Services/delivery.service';
import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import { IWarehouse } from 'src/app/Models/iwarehouse.model';
import { WarehouseService } from 'src/app/Services/warehouse.service';

@Component({
  selector: 'app-delivery-create',
  templateUrl: './delivery-create.component.html',
  styleUrls: ['./delivery-create.component.css']
})
export class DeliveryCreateComponent implements OnInit {

  public successMessage = '';
  public errorMessage = '';
  public deliveryCreated: boolean | undefined;
  //private userId: any;
  //public user = {} as IUser;
  warehousesList: IWarehouse[] = [];
  public isActive : any;
  warehouse: any;
  public arr: any;
  public lengthArr: any;

  ChooseWarehouse(e: any) {
    this.warehouse = e.target.value;
  }

  constructor(private deliveryService: DeliveryService, private warehouseService : WarehouseService) { }

  ngOnInit(): void {
    this.deliveryService.getWarehousesLocation().subscribe((data: any) => {
      this.warehousesList = data;

      for(let i = 0; i < this.warehousesList.length; i++){
        let whi = this.warehousesList[i].warehouseId;
        this.isActive = this.warehouseService.checkActivatedWarehouse(whi).subscribe((data:any) => {
          this.isActive = data;

        if(this.isActive == false){
          let index = this.warehousesList.findIndex(obj => obj.warehouseId === whi);
          if(index != undefined)
          this.warehousesList?.splice(index, 1);
        }
      });
    }
    })
  }

  addDelivery(form: NgForm) {
    //increment deliveryID
    let finalId;
    let finalId2;
    let aux = 0;
    let finalIdDelivery = '';

    this.arr = this.deliveryService.getAllDeliveries().subscribe((data: any) => {
      this.arr = data;
      this.lengthArr = this.arr.length;
      //finalId = this.arr.at(-1).deliveryId;
      // finalId2 = (parseInt(finalId) + 1).toString();

      if (this.arr.length === 0) {
        finalId2 = 1;
      } else {
        for (let i=0; i<this.arr.length; i++) {
          if (parseInt(this.arr.at(i).deliveryId) > aux) {
            aux = parseInt(this.arr.at(i).deliveryId);
          }
        }
        finalId = aux;
        // @ts-ignore
        finalId2 = (parseInt(finalId) + 1).toString();
      }
      // finalIdDelivery = JSON.stringify(finalId2);

      this.deliveryService.addDelivery({
        deliveryId: finalId2.toString(),
        deliveryDate: form.value.deliveryDate,
        mass: form.value.mass,
        warehouseId: this.warehouse,
        loadTime: form.value.loadTime,
        unloadTime: form.value.unloadTime
      }
      ).subscribe((data: any) => {
        this.deliveryCreated = true
        this.successMessage = "Delivery created successfully!"
        this.refresh()
      }, (error: { message: string; }) => {
        this.deliveryCreated = false;
        this.errorMessage = error.message;
      })
    });
  }

  refresh(): void {
    window.location.reload();
  }
}
