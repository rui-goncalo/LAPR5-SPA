import { Component, OnInit } from '@angular/core';
import {ITrip} from "../../Models/itrip.model";
import {TripService} from "../../Services/trip.service";

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  trips: ITrip[] = [];
  p: number = 1;
  itemsPerPage: number = 5;

  constructor(private tripService: TripService) { }

  ngOnInit(): void {
    this.tripService.getAllTrips().subscribe(data => this.trips = data);
  }

}
