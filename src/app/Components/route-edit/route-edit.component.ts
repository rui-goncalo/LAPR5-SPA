import {Component, OnInit, ViewChild} from '@angular/core';
import {RouteService} from "../../Services/route.service";
import {NgForm} from "@angular/forms";
import {IRoute} from "../../Models/iroute.model";
import { IWarehouse } from 'src/app/Models/iwarehouse.model';
import { WarehouseService } from 'src/app/Services/warehouse.service';
import {AuthorizationService} from "../../Services/authorization.service";

@Component({
  selector: 'app-route-edit',
  templateUrl: './route-edit.component.html',
  styleUrls: ['./route-edit.component.css']
})
export class RouteEditComponent implements OnInit {
  public successMessage = '';
  public errorMessage = '';
  public routeEdit: boolean | undefined;


  routes: IRoute[] = [];
  @ViewChild('routeForm') form: NgForm | undefined;
  editMode: boolean = false;
  // @ts-ignore
  currentRouteId: string;
  warehousesList: IWarehouse[] = [];
  public isActive : any;
  warehouse: any;
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

  /*ChooseOrigin(e: any) {
    console.log(e.target.value);
    this.warehouseOrigin = e.target.value;
  }*/

  editRoute(form: NgForm) {
    this.routeService.editRoute({
      routeId: this.currentRouteId,
      origin: form.value.origin,
      destination: form.value.destination,
      distance: form.value.distance,
      timeDistance: form.value.timeDistance,
      energySpent: form.value.energySpent,
      extraTimeBattery: form.value.extraTimeBattery
    }).subscribe((data: any) => {
      this.routeEdit = true
      this.successMessage = "Route edited successfully!"
      this.refresh()
    }, (error: { message: string; }) => {
      this.routeEdit = false;
      this.errorMessage = "Route not found.";
    })
  }

  getDesignationByWarehouseId(warehouseId: string) {
    for (let i=0; i < this.warehousesList.length; i++) {
      if(warehouseId === this.warehousesList[i].warehouseId) {
        this.warehouse = this.warehousesList[i].warehouseDesignation;
      }
    }
    return this.warehouse;
  }

  onEditClicked(routeId: string) {
    this.currentRouteId = routeId;

    //get the route ID
    let currentRoute = this.routes?.find((route) => {
      return route.routeId === routeId
    })
    //console.log(currentRoute);
    //console.log("getDesignationByWarehouseId: " + this.warehouse.origin + " || " + this.warehouse.warehouseDesignation);

    //populate origin and destination with designation
    // @ts-ignore
    //let originW = this.getDesignationByWarehouseId(currentRoute.origin);
    // @ts-ignore
    //let destinationW = this.getDesignationByWarehouseId(currentRoute.destination);

    //populate the form with the route details
    this.form?.setValue({
      // @ts-ignore
      origin: currentRoute.origin,
      //origin: originW,
      // @ts-ignore
      destination: currentRoute.destination,
      //destination: destinationW,
      // @ts-ignore
      distance: currentRoute.distance,
      // @ts-ignore
      timeDistance: currentRoute.timeDistance,
      // @ts-ignore
      energySpent: currentRoute.energySpent,
      // @ts-ignore
      extraTimeBattery: currentRoute.extraTimeBattery
    });

    //Button value to be able to click
    this.editMode = true;
  }

  private refresh() {
    window.location.reload();
  }
}
