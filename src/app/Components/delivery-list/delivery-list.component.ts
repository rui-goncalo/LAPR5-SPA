import { DeliveryService } from './../../Services/delivery.service';
import { IDelivery } from './../../Models/idelivery.model';
import { Component, OnInit } from '@angular/core';
import { any } from 'cypress/types/bluebird';
import { IWarehouse } from 'src/app/Models/iwarehouse.model';
import { WarehouseService } from 'src/app/Services/warehouse.service';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.css']
})
export class DeliveryListComponent implements OnInit {

  deliveries: IDelivery[] = [];
  warehousesList: IWarehouse[] = [];
  public isActive : any;
  warehouse: any;
  lengthWarehouse: any;
  tempu: any;
  warehouseAux: any;

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
    for (let i = 0; i < this.warehousesList.length; i++) {
      if (warehouseId === this.warehousesList[i].warehouseId) {
        this.warehouse = this.warehousesList[i].warehouseDesignation;
      }
    }
    return this.warehouse;
  }

  Search() {
    if (this.warehouseAux == "") {
      this.ngOnInit();
    } else {
      this.deliveries = this.deliveries?.filter(res => {
        let wh = this.searchDeliveryByDesignation(res.warehouseId);
        return wh.toLocaleLowerCase().match(this.warehouseAux.toLocaleLowerCase());
      });
    }
  }

  key: string = 'deliveryDate';
  reverse: boolean = false;

  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  searchDeliveryByDesignation(warehouseId: string) {
    for (let i = 0; i < this.warehousesList.length; i++) {
      if (warehouseId === this.warehousesList[i].warehouseId) {
        this.tempu = this.warehousesList[i].warehouseDesignation;
      }
    }
    return this.tempu;
  }

  /*private async getAllDeliveries() {
    const warehouseList = await this.deliveryService.getAllDeliveries();
    this.deliveries = warehouseList;
  }*/
}
