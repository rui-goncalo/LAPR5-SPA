import { Component, OnInit } from '@angular/core';
import {TripService} from "../../Services/trip.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-trip-create',
  templateUrl: './trip-create.component.html',
  styleUrls: ['./trip-create.component.css']
})
export class TripCreateComponent implements OnInit {
  public successMessage = 'Trip created successfully!';
  public errorMessage = 'Error while creating Trip.';
  public tripCreated: boolean | undefined;
  public arr: any;
  public lengthArr: any;

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
  }

  addTrip(form: NgForm) {
    //Increment tripId
    let finalId;
    let finalId2: string | number;
    let aux = 0;
    let finalIdTrip = '';

    this.arr = this.tripService.getAllTrips().subscribe((data: any) => {
      this.arr = data;
      this.lengthArr = this.arr.length;

      if (this.arr.length === 0) {
        finalId2 = 1;
      } else {
        for (let i=0; i<this.arr.length; i++) {
          if (parseInt(this.arr.at(i).tripId) > aux) {
            aux = parseInt(this.arr.at(i).tripId);
          }
        }
        finalId = aux;
        // @ts-ignore
        finalId2 = (parseInt(finalId) + 1).toString();
      }
      finalIdTrip =JSON.stringify(finalId2);

      console.log(finalId2);

      this.tripService.addTrip({
        tripId: finalIdTrip,
        tripRoutes: form.value.tripRoutes
      }
      ).subscribe((data: any) => {
        this.tripCreated = true
        this.successMessage = "Trip created successfully!"
        this.refresh()
      }, (error: { message: string; }) => {
        this.tripCreated = false;
        // @ts-ignore
        this.errorMessage = "Error while creating Trip\n" + "tripID: " + finalId2 + " trip routes: " + form.value.tripRoutes;
      })
    });
  }

  refresh(): void {
    window.location.reload();
  }

}
