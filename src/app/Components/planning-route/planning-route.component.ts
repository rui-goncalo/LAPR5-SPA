import { Component, OnInit } from '@angular/core';
import {PlanningRouteService} from "../../Services/planning-route.service";
import {NgForm} from "@angular/forms";
import {WarehouseService} from "../../Services/warehouse.service";

@Component({
  selector: 'app-planning-route',
  templateUrl: './planning-route.component.html',
  styleUrls: ['./planning-route.component.css']
})
export class PlanningRouteComponent implements OnInit {
  // @ts-ignore
  planningRouteId: string;
  // @ts-ignore
  truckId: string;
  // @ts-ignore
  date: string;
  // @ts-ignore
  planningRoute: string[];
  routeNames: any;
  // warehouses: any;
  algorithm: any;
  public successMessage = '';
  public errorMessage = '';
  public planningRouteSaved: boolean | undefined;


  constructor(private planningRouteService: PlanningRouteService, private warehouseService: WarehouseService) { }

  ngOnInit(): void {
  }

  getBestRoute(): void {
    this.planningRouteService.getBestRoute(this.truckId, this.date).subscribe(data => {
      this.retRes(data);
    })
    this.planningRoute = [];
  }

  getHDist(): void {
    this.planningRouteService.getHDist(this.truckId, this.date).subscribe(data => {
      this.retRes(data);
    })
    this.planningRoute = [];
  }

  getHMassa(): void {
    this.planningRouteService.getHMassa(this.truckId, this.date).subscribe(data => {
      this.retRes(data);
    })
    this.planningRoute = [];
  }

  getHMassaTempo(): void {
    this.planningRouteService.getHMassaTempo(this.truckId, this.date).subscribe(data => {
      this.retRes(data);
    })
    this.planningRoute = [];
  }

  getAlgGen(): void {
    this.planningRouteService.getAlgGen(this.truckId, this.date).subscribe(data => {
      this.retRes(data);
    })
    this.planningRoute = [];
  }

  private retRes(data: any) {
    this.planningRoute = [];


    for (let i = 0; i < data.length; i++) {
      this.getWarehouseId(data[i])

      let j = data[i].toString().length;
      if (j == 1) {
        this.planningRoute[i] = "A" + data[i];
      } else {
        this.planningRoute[i] = "A" + data[i];
      }
    }
  }

  getWarehouseId(data: any):void {
    this.warehouseService.getWarehouseById(data.warehouseId).subscribe(data => {
     console.log(data)
    })
  }

  ChooseAlgorithm() {
    switch(this.algorithm) {
      case "bestRoute": {
        this.getBestRoute();
        break;
      }
      case "HDist": {
        this.getHDist();
        break;
      }
      case "HMassa": {
        this.getHMassa();
        break;
      }
      case "HMassaTempo": {
        this.getHMassaTempo();
        break;
      }
      case "AlgGen": {
        this.getAlgGen();
        break;
      }
    }
  }

  private refresh() {
    window.location.reload();
  }
}
