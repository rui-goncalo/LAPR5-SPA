import { Component, OnInit, ViewChild } from '@angular/core';
import {WarehouseService} from "../../Services/warehouse.service";
import {NgForm} from "@angular/forms";
import { IWarehouse } from 'src/app/Models/iwarehouse.model';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.css']
})
export class WarehouseListComponent implements OnInit {
  public successMessage = '';
  public errorMessage = '';
  public warehouseInactive: boolean | undefined;
  public warehouseActive: boolean | undefined;
  
  warehouses : IWarehouse[] = [];
  public isActive : any;
  public inactiveWarehouses : IWarehouse[] = [];
  public warehouseTemp : any;


  constructor(private warehouseService: WarehouseService) { }

  ngOnInit(): void {

      this.warehouseService.getAllWarehouses().subscribe((data:any) => {
      this.warehouses = data;

    for(let i = 0; i < this.warehouses.length; i++){
        let whi = this.warehouses[i].warehouseId;
        this.isActive = this.warehouseService.checkActivatedWarehouse(whi).subscribe((data:any) => {
          this.isActive = data;
        
        if(this.isActive == false){
          this.inactiveWarehouses.push(this.warehouses[i]);
          let index = this.warehouses.findIndex(obj => obj.warehouseId === whi);
          if(index != undefined)
          this.warehouses?.splice(index, 1);
        }
      });
    }
  });
  }
  
  onInibirClicked(warehouseId: string) {
    //this.currentWarehouseId = warehouseId;
    console.log(warehouseId);

    this.isActive = this.warehouseService.checkActivatedWarehouse(warehouseId).subscribe((data:any) => {
      this.isActive = data;

      if(this.isActive == true){

        this.warehouseTemp = this.warehouseService.getWarehouseById(warehouseId).subscribe((data:any) => {
        this.warehouseTemp = data;
      
      this.warehouseService.markWarehouseAsInactive(
        this.warehouseTemp
      ).subscribe((data: any) => {
        const index = this.warehouses?.findIndex(obj => obj.warehouseId === warehouseId);
        if(index != undefined)
        this.warehouses?.splice(index, 1);
        this.inactiveWarehouses.push(this.warehouseTemp)
        this.warehouseInactive = true
        this.successMessage = "Warehouse inactivated successfully!"
        //this.refresh()
      }, (error: { message: string; }) => {
        this.warehouseInactive = false;
        this.errorMessage = error.message;
      })
    })
    } else {
      this.warehouseInactive = false;
      this.errorMessage = "Warehouse already desactivated"
      this.refresh()
    }
    })
  }; 

  onDesinibirClicked(warehouseId: string) {

    this.isActive = this.warehouseService.checkActivatedWarehouse(warehouseId).subscribe((data:any) => {
      this.isActive = data;

      if(this.isActive == false){
        this.warehouseTemp = this.warehouseService.getWarehouseById(warehouseId).subscribe((data:any) => {
          this.warehouseTemp = data;
    
    
        this.warehouseService.markWarehouseAsactive(
          this.warehouseTemp
        ).subscribe((data: any) => {
          const index = this.inactiveWarehouses.findIndex( obj => obj.warehouseId === warehouseId);
          if(index != undefined)
          this.inactiveWarehouses.splice(index, 1);
          this.warehouses?.push(this.warehouseTemp)
          this.warehouseActive = true
          this.successMessage = "Warehouse activated successfully!"
          //this.refresh()
        }, (error: { message: string; }) => {
          this.warehouseInactive = false;
          this.errorMessage = error.message;
        })
      })
      }else {
        this.warehouseActive = false;
        this.errorMessage = "Warehouse already activated"
        this.refresh()
      }
    })
  }; 

  refresh(): void {
    window.location.reload();
  }

  }
  

