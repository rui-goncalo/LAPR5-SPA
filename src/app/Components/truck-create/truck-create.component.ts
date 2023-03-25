import {Component, OnInit} from '@angular/core';
import {TruckService} from "../../Services/truck.service";
import {NgForm} from "@angular/forms";
import {ITruck} from "../../Models/itruck.model";
import {AuthorizationService} from "../../Services/authorization.service";

@Component({
  selector: 'app-truck-create',
  templateUrl: './truck-create.component.html',
  styleUrls: ['./truck-create.component.css']
})
export class TruckCreateComponent implements OnInit {

  public successMessage = '';
  public errorMessage = '';
  public truckCreated: boolean | undefined;
  public arr: any;
  public trucks: ITruck[] | undefined = [];
  public lengthArr: any;
  public activeTrue = 'true';

  permissions: number[] = [2,3]

  constructor(private truckService: TruckService,
              private autService: AuthorizationService ) {
  }

  ngOnInit(): void {

    const token = JSON.parse(sessionStorage.getItem("token")!);

    if (token) {
      if (!this.permissions.includes(token.role)){
        this.autService.redirect("/home")
      }
    }
  }

  addTruck(form: NgForm) {

    let finalId;
    let finalId2;
    let aux = 0;
    let finalIdTruck = '';

    this.arr = this.truckService.getAllTrucks().subscribe((data: any) => {
      this.arr = data;
      this.lengthArr = this.arr.length;
      // finalId = this.arr.at(-1).truckId;
      // finalId2 = (parseInt(finalId) + 1).toString();

      if (this.arr.length === 0) {
        finalId2 = 1;
      } else {
        for (let i=0; i<this.arr.length; i++) {
          if (parseInt(this.arr.at(i).truckId) > aux) {
            aux = parseInt(this.arr.at(i).truckId);
          }
        }
        finalId = aux;
        // @ts-ignore
        finalId2 = (parseInt(finalId) + 1).toString();
      }
      // finalIdTruck = JSON.stringify(finalId2);

      this.truckService.addTruck({
        truckId: finalId2.toString(),
        registration: form.value.registration,
        batteryCap: form.value.batteryCap,
        maxBatteryCap: form.value.maxBatteryCap,
        electricRange: form.value.electricRange,
        chargeTime: form.value.chargeTime,
        tareWeight: form.value.tareWeight,
        isActive: this.activeTrue
      }
      ).subscribe((data: any) => {
        this.truckCreated = true
        this.successMessage = "Truck created successfully!"
        this.refresh()
      }, (error: { message: string; }) => {
        this.truckCreated = false;
        this.errorMessage = error.message;
      });
    });
  }


  refresh(): void {
    window.location.reload();
  }
}
