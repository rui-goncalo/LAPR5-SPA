import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from "../../../Services/authorization.service";

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {

  links: any[] = [
    {"route": "/packaging/create", "description": "Packaging", "roles": [3,4]},
    {"route": "/trucks/create", "description": "Trucks", "roles": [2,4]},
    {"route": "/warehouses/create", "description": "Warehouses", "roles": [1,4]},
    {"route": "/routes/create", "description": "Routes", "roles": [2,4]},
  ];

  roles: string[] = [
    "Warehouse Manager",
    "Logistics Manager",
    "Planning Manager",
    "Administrator",
  ];

  userData: any;
  name: any;

  constructor(private autService: AuthorizationService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("token")) {
      this.userData = JSON.parse(sessionStorage.getItem("token")!);
      this.name = this.userData.firstName + " " + this.userData.lastName;
    }
  }

  logout() {
    sessionStorage.removeItem("token");
    this.autService.redirectToLogin();
  }
}
