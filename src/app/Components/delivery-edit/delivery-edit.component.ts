import { DeliveryService } from './../../Services/delivery.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {IDelivery} from "../../Models/idelivery.model";
import { IWarehouse } from 'src/app/Models/iwarehouse.model';
import { WarehouseService } from 'src/app/Services/warehouse.service';

@Component({
  selector: 'app-delivery-edit',
  templateUrl: './delivery-edit.component.html',
  styleUrls: ['./delivery-edit.component.css']
})
export class DeliveryEditComponent implements OnInit {

  public successMessage = '';
  public errorMessage = '';
  public deliveryEdit: boolean | undefined;
  //private userId: any;
  //public user = {} as IUser;

  deliveries: IDelivery[] = [];
  @ViewChild('deliveryForm') form: NgForm | undefined;
  editMode: boolean = false;
  // @ts-ignore
  currentDeliveryId: string;
  warehousesList: IWarehouse[] = [];
  public isActive : any;
  warehouse: any;

  constructor(private deliveryService: DeliveryService, private warehouseService : WarehouseService) { }

  ngOnInit(): void {
    this.deliveryService.getAllDeliveries().subscribe((data: any) => {
      this.deliveries = data
      for(let i = 0; i < this.deliveries.length; i++){
        let whi = this.deliveries[i].warehouseId;
        this.isActive = this.warehouseService.checkActivatedWarehouse(whi).subscribe((data:any) => {
          this.isActive = data;
        
        if(this.isActive == false){
          let index = this.deliveries.findIndex(obj => obj.warehouseId === whi);
          if(index != undefined)
          this.deliveries?.splice(index, 1);
        }
      });
    }
    
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
  });
  }

  getDesignationByWarehouseId(warehouseId: string) {
    for (let i=0; i < this.warehousesList.length; i++) {
      if(warehouseId === this.warehousesList[i].warehouseId) {
        this.warehouse = this.warehousesList[i].warehouseDesignation;
      }
    }
    return this.warehouse;
  }

  editDelivery(form: NgForm) {
    this.deliveryService.editDeliveryById({
      deliveryId: this.currentDeliveryId,
      deliveryDate: form.value.deliveryDate,
      mass: form.value.mass,
      warehouseId: form.value.warehouseId,
      loadTime: form.value.loadTime,
      unloadTime: form. value.unloadTime
    }).subscribe((data: any) => {
      this.deliveryEdit = true
      this.successMessage = "Delivery edited successfully!"
      this.refresh()
    }, (error: { message: string; }) => {
      this.deliveryEdit = false;
      this.errorMessage = error.message;
    })
  }

  onEditClicked(deliveryId: string) {
    this.currentDeliveryId = deliveryId;

    //get the delivery ID
    let currentDelivery = this.deliveries?.find((delivery) => {
      return delivery.deliveryId === deliveryId
    })
    console.log(currentDelivery);

    //populate the form with the delivery details
    this.form?.setValue({
      // @ts-ignore
      deliveryDate: currentDelivery.deliveryDate,
      // @ts-ignore
      mass: currentDelivery.mass,
      // @ts-ignore
      warehouseId: currentDelivery.warehouseId,
      // @ts-ignore
      loadTime: currentDelivery.loadTime,
      // @ts-ignore
      unloadTime: currentDelivery.unloadTime
    });

    //Button value to be able to click
    this.editMode = true;
  }

  private refresh() {
    window.location.reload();
  }

}
