import { Component, OnInit } from '@angular/core';
import {IRoute} from "../../Models/iroute.model";
import {RouteService} from "../../Services/route.service";
import { IWarehouse } from 'src/app/Models/iwarehouse.model';
import { WarehouseService } from 'src/app/Services/warehouse.service';
import {AuthorizationService} from "../../Services/authorization.service";

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {
  routes: IRoute[] = [];
  warehousesList: IWarehouse[] = [];
  public isActive : any;
  warehouse: any;
  p: number = 1;
  itemsPerPage: number = 5;

  permissions: number[] = [2,3]

  constructor(private routeService: RouteService,
              private warehouseService : WarehouseService,
              private autService: AuthorizationService) { }

  ngOnInit(): void {


    const token = JSON.parse(sessionStorage.getItem("token")!);

    if (token) {
      if (!this.permissions.includes(token.role)){
        this.autService.redirect("/home")
      }
    }

    this.routeService.getAllRoutes().subscribe((data: any) => {
      this.routes = data
      for(let i = 0; i < this.routes.length; i++){
        let whi = this.routes[i].origin;
        this.isActive = this.warehouseService.checkActivatedWarehouse(whi).subscribe((data:any) => {
          this.isActive = data;
        if(this.isActive == false){
          let index = this.routes.findIndex(obj => obj.origin === whi);
          if(index != undefined)
          this.routes?.splice(index, 1);
        }
      });

      let whi2 = this.routes[i].destination;
      this.isActive = this.warehouseService.checkActivatedWarehouse(whi2).subscribe((data:any) => {
        this.isActive = data;
      if(this.isActive == false){
        let index = this.routes.findIndex(obj => obj.destination === whi2);
        if(index != undefined)
        this.routes?.splice(index, 1);
      }
    });


  };

  this.routeService.getWarehousesLocation().subscribe((data: any) => {
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

  /*private async getAllRoutes() {
    const routesList = await this.routeService.getAllRoutes();
    this.routes = routesList;
  }*/
}
