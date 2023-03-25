import {Component, OnInit} from '@angular/core';
import {RouteService} from "../../Services/route.service";
import {Route} from "@angular/router";
import {NgForm} from "@angular/forms";
import {IRoute} from "../../Models/iroute.model";
import { IWarehouse } from 'src/app/Models/iwarehouse.model';
import { WarehouseService } from 'src/app/Services/warehouse.service';
import {AuthorizationService} from "../../Services/authorization.service";

@Component({
  selector: 'app-route-create',
  templateUrl: './route-create.component.html',
  styleUrls: ['./route-create.component.css']
})
export class RouteCreateComponent implements OnInit {

  public successMessage = 'Route created successfully!';
  public errorMessage = 'Error while creating Route.';
  public routeCreated: boolean | undefined;
  //private userId: any;
  //public user = {} as IUser;
  warehousesList: IWarehouse[] = [];
  public isActive : any;
  warehouseOrigin: any;
  warehouseDestination: any;
  public arr: any;
  public lengthArr: any;

  permissions: number[] = [2,3]


  ChooseOrigin(e: any) {
    console.log(e.target.value);
    this.warehouseOrigin = e.target.value;
  }

  ChooseDestination(e: any) {
    console.log(e.target.value);
    this.warehouseDestination = e.target.value;
  }

  constructor(private routeService: RouteService,
              private warehouseService : WarehouseService,
              private autService: AuthorizationService) {
  }

  ngOnInit(): void {

    const token = JSON.parse(sessionStorage.getItem("token")!);

    if (token) {
      if (!this.permissions.includes(token.role)){
        this.autService.redirect("/home")
      }
    }

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
  }

  addRoute(form: NgForm) {
    //Increment routeID
    let finalId;
    let finalId2;
    let aux = 0;
    let finalIdRoute = '';

    this.arr = this.routeService.getAllRoutes().subscribe((data: any) => {
      this.arr = data;
      this.lengthArr = this.arr.length;
      // finalId = this.arr.at(-1).routeId;
      // finalId2 = (parseInt(finalId) + 1).toString();
      if (this.arr.length === 0) {
        finalId2 = 1;
      } else {
        for (let i=0; i<this.arr.length; i++) {
          if (parseInt(this.arr.at(i).routeId) > aux) {
            aux = parseInt(this.arr.at(i).routeId);
          }
        }
        finalId = aux;
        // @ts-ignore
        finalId2 = (parseInt(finalId) + 1).toString();
      }
      // finalIdRoute =JSON.stringify(finalId2);

    this.routeService.addRoute({
      routeId: finalId2.toString(),
      origin: this.warehouseOrigin,
      destination: this.warehouseDestination,
      distance: form.value.distance,
      timeDistance: form.value.timeDistance,
      energySpent: form.value.energySpent,
      extraTimeBattery: form.value.extraTimeBattery
    }
    ).subscribe((data: any) => {
      this.routeCreated = true
      this.successMessage = "Route created successfully!"
      this.refresh()
    }, (error: { message: string; }) => {
      this.routeCreated = false;
      this.errorMessage = "Error while creating Route:\n" + form.value.routeId + "\n" + this.warehouseOrigin + "\n" + this.warehouseDestination + "\n" + form.value.distance + "\n" +
        form.value.timeDistance + "\n" + form.value.extraTimeBattery;
    })
    });
  }

  refresh(): void {
    window.location.reload();
  }

}
