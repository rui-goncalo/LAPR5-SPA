import { Component, OnInit } from '@angular/core';
import {WarehouseService} from '../../Services/warehouse.service';
import {NgForm} from "@angular/forms";
import {AuthorizationService} from "../../Services/authorization.service";
import { IWarehouse } from 'src/app/Models/iwarehouse.model';


@Component({
  selector: 'app-warehouse-create',
  templateUrl: './warehouse-create.component.html',
  styleUrls: ['./warehouse-create.component.css']
})
export class WarehouseCreateComponent implements OnInit {

  public successMessage = '';
  public errorMessage = '';
  public warehouseCreated: boolean | undefined;

  public arr: any;
  public lengthArr: any;

  permissions: number[] = [1,4]

  constructor(private warehouseService: WarehouseService,
              private autService: AuthorizationService) { }

  ngOnInit(): void {

    const token = JSON.parse(sessionStorage.getItem("token")!);

    if (token) {
      if (!this.permissions.includes(token.role)){
        this.autService.redirect("/home")
      }
    }

  }

  addWarehouse(form: NgForm) {
    //increment deliveryID
    let finalId;
    let finalId2;
    let aux = 0;
    let finalIdWarehouse = '';
    //let variableTemp = '786'

    this.arr = this.warehouseService.getAllWarehouses().subscribe((data: any) => {
      this.arr = data;
      this.lengthArr = this.arr.length;
      //finalId = this.arr.at(-1).warehouseId;
      //finalId2 = (parseInt(finalId) + 1).toString();

      if (this.arr.length === 0) {
        finalId2 = 1;
      } else {
        for (let i=0; i<this.lengthArr; i++) {
          if (parseInt(this.arr.at(i).warehouseId) > aux) {
            aux = parseInt(this.arr.at(i).warehouseId);
          }
        }
        finalId = aux;
        // @ts-ignore
        finalId2 = (finalId + 1);
      }
      // finalIdWarehouse = JSON.stringify(finalId2);

      this.warehouseService.addWarehouse({
        warehouseId: finalId2.toString(),
        warehouseAddress: form.value.warehouseAddress,
        warehouseDesignation: form.value.warehouseDesignation,
        warehouseGeoCoord: form.value.warehouseGeoCoord
      }
      ).subscribe((data: any) => {
        this.warehouseCreated = true
        this.successMessage = "Warehouse created successfully!"
        this.refresh()
      }, (error: { message: string; }) => {
        this.warehouseCreated = true;
        this.successMessage = "Warehouse created successfully!"
      })
    });
  }

  refresh(): void {
    window.location.reload();
  }
}
