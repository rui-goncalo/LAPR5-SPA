import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IWarehouse} from '../Models/iwarehouse.model';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  warehouseURL = 'https://dotnet016.azurewebsites.net/api/Warehouses';
  // warehouseURL = 'https://localhost:5001/api/Warehouses';

  constructor(private http: HttpClient) { }

  addWarehouse(warehouse : IWarehouse) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<IWarehouse>(this.warehouseURL, warehouse, { headers });
  }

  getAllWarehouses() {
    return this.http.get<IWarehouse[]>(this.warehouseURL);
  }

  getWarehouseById(warehouseId : string){
    return this.http.get<IWarehouse>(this.warehouseURL+ "/ByIdentifier/" + warehouseId);
  }

  //true: if is activated
  // checkActivatedWarehouse(warehouseId : string): Promise<boolean | undefined> {
  //   return this.http.get<boolean>(this.warehouseURL+ "/checkactivated/" + warehouseId).toPromise().then(response => {
  //     return response;
  //   });
  // }

  checkActivatedWarehouse(warehouseId : string){
    return this.http.get<boolean>(this.warehouseURL+ "/checkactivated/" + warehouseId);
  }


  editWarehouse(warehouse: IWarehouse) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<IWarehouse>(this.warehouseURL, warehouse, { headers });
  }

  editWarehouseById(warehouse: IWarehouse) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<IWarehouse>(this.warehouseURL + "/" + warehouse.warehouseId, warehouse, { headers });
  }

  //warehouse turns inactivated
  markWarehouseAsInactive(warehouse: IWarehouse){
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<IWarehouse>(this.warehouseURL + "/inactivate/" + warehouse.warehouseId, warehouse, { headers });
  }

    //warehouse turns inactivated
    markWarehouseAsactive(warehouse: IWarehouse){
      const headers = { 'Content-Type': 'application/json' };
      return this.http.put<IWarehouse>(this.warehouseURL + "/activate/" + warehouse.warehouseId, warehouse, { headers });
    }
}
