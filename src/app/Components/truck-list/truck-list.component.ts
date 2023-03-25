import { Component, OnInit } from '@angular/core';
import {TruckService} from "../../Services/truck.service";
import {ITruck} from "../../Models/itruck.model";
import {AuthorizationService} from "../../Services/authorization.service";

@Component({
  selector: 'app-truck-list',
  templateUrl: './truck-list.component.html',
  styleUrls: ['./truck-list.component.css']
})
export class TruckListComponent implements OnInit {

  public successMessage = '';
  public errorMessage = '';
  public truckInactive: boolean | undefined;
  public truckActive: boolean | undefined;

  trucks : ITruck[] = [];
  public inactiveTrucks : ITruck[] = [];
  public truckTemp : any;

  permissions: number[] = [2,3]

  constructor( private truckService: TruckService,
               private autService: AuthorizationService) { }

  ngOnInit(): void {

    const token = JSON.parse(sessionStorage.getItem("token")!);

    if (token) {
      if (!this.permissions.includes(token.role)){
        this.autService.redirect("/home")
      }
    }

    this.truckService.getAllTrucks().subscribe((data:any) => {
    this.trucks = data;

  for(let i = 0; i < this.trucks.length; i++){
      let trId = this.trucks[i].truckId;
      if(this.trucks[i].isActive === 'false'){
        this.inactiveTrucks.push(this.trucks[i]);
        let index = this.trucks.findIndex(obj => obj.truckId === trId);
        if(index != undefined)
        this.trucks?.splice(index, 1);
      }
  }
});
}

onInibirClicked(truckId: string) {
  //this.truckId = truckId;
  console.log(truckId);
      this.truckTemp = this.truckService.getTruckById(truckId).subscribe((data:any) => {
      this.truckTemp = data;
    if(this.truckTemp.isActive == 'true'){
      this.truckService.markTruckAsInactive(
        this.truckTemp
      ).subscribe((data: any) => {
        const index = this.trucks?.findIndex(obj => obj.truckId === truckId);
        if(index != undefined)
        this.trucks?.splice(index, 1);
        this.inactiveTrucks.push(this.truckTemp)
        this.truckInactive = true
        this.successMessage = "Truck desactivated successfully!"
        //this.refresh()
      }, (error: { message: string; }) => {
        this.truckInactive = false;
        this.errorMessage = error.message;
      })
    }else {
      this.truckInactive = false;
      this.errorMessage = "Truck already desactivated"
      this.refresh()
    }
  })
};

onDesinibirClicked(truckId: string) {

      this.truckTemp = this.truckService.getTruckById(truckId).subscribe((data:any) => {
        this.truckTemp = data;

        if(this.truckTemp.isActive == 'false'){
          this.truckService.markTruckAsactive(
            this.truckTemp
          ).subscribe((data: any) => {
            const index = this.inactiveTrucks.findIndex( obj => obj.truckId === truckId);
            if(index != undefined)
            this.inactiveTrucks.splice(index, 1);
            this.trucks?.push(this.truckTemp)
            this.truckActive = true
            this.successMessage = "Truck activated successfully!"
            //this.refresh()
          }, (error: { message: string; }) => {
            this.truckActive = false;
            this.errorMessage = error.message;
          })
        }else {
          this.truckActive = false;
          this.errorMessage = "Truck already activated"
          this.refresh()
        }
    })
};

refresh(): void {
  window.location.reload();
}

}

