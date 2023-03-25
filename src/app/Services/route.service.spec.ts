import { TestBed } from '@angular/core/testing';

import { RouteService } from './route.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {IRoute} from "../Models/iroute.model";

describe('RouteService', () => {
  let service: RouteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteService],
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(RouteService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should retrieve route from the API via POST', () => {
    const route: IRoute =
      {
        "routeId": "1",
        "origin": "123",
        "destination": "124",
        "distance": "350",
        "timeDistance": "90:00",
        "energySpent": "100",
        "extraTimeBattery": "10:00"
      };

    it('should return the routeId', () => {
      service.addRoute(route).subscribe(route => {
        expect(route.routeId).toBe("1");
      });

      const request = httpMock.expectOne(`${service.routeURL}`);
      expect(request.request.method).toEqual('POST');

      request.flush(route);
    })

    it('should return true to create route', () => {
      expect(route).toBeTruthy();
    })
  });

  describe('should retrieve route from the API via PUT', () => {
    const route: IRoute =
      {
        "routeId": "1",
        "origin": "123",
        "destination": "124",
        "distance": "350",
        "timeDistance": "90:00",
        "energySpent": "100",
        "extraTimeBattery": "10:00"
      };

    it('should return the editedRoute after creating', () => {
      const editedRoute: IRoute =
        {
          "routeId": "1",
          "origin": "123",
          "destination": "124",
          "distance": "400",
          "timeDistance": "90:00",
          "energySpent": "100",
          "extraTimeBattery": "10:00"
        };

      service.editRoute(editedRoute).subscribe(route => {
        expect(route.distance).toBe("400");
      });

      const request = httpMock.expectOne(`${service.routeURL}`);
      expect(request.request.method).toEqual('PUT');

      request.flush(editedRoute);
    })
  });

  describe('should retrieve routes from the API via GET', () => {
    const dummyList: IRoute[] = [
      {
        "routeId": "1",
        "origin": "123",
        "destination": "124",
        "distance": "350",
        "timeDistance": "92120:00",
        "energySpent": "100",
        "extraTimeBattery": "10:00"
      },
      {
        "routeId": "2",
        "origin": "LIS",
        "destination": "ALG",
        "distance": "300",
        "timeDistance": "60:00",
        "energySpent": "100",
        "extraTimeBattery": "10:00"
      }
    ];

    it('should return the same length', () => {
      service.getAllRoutes().subscribe(routes => {
        expect(routes.length).toBe(2);
      });

      const request = httpMock.expectOne(`${service.routeURL}`);
      expect(request.request.method).toEqual('GET');

      request.flush(dummyList);
    })

    it('should return true to equal', () => {
      service.getAllRoutes().subscribe(routes => {
        expect(routes).toEqual(dummyList);
      });

      const request = httpMock.expectOne(`${service.routeURL}`);
      expect(request.request.method).toEqual('GET');

      request.flush(dummyList);
    })
  });

});
