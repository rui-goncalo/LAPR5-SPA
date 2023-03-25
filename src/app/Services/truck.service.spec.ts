import { TestBed } from '@angular/core/testing';

import { TruckService } from './truck.service';
import {ITruck} from "../Models/itruck.model";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('TruckService', () => {
  let service: TruckService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TruckService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TruckService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  describe('should retrieve truck from the API via POST', () => {
    const truck: ITruck =
      {
        "truckId": "1",
        "registration": "55-PP-88",
        "batteryCap": "3130",
        "maxBatteryCap": "3233",
        "electricRange": "370",
        "chargeTime": "22:22",
        "tareWeight": "60.000",
        "isActive": "true"
      };

    it('should return the truckId', () => {
      service.addTruck(truck).subscribe(truck => {
        expect(truck.truckId).toBe("1");
      });

      const request = httpMock.expectOne(`${service.truckURL}`);
      expect(request.request.method).toEqual('POST');

      request.flush(truck);
    })

    it('should return true to create route', () => {
      expect(truck).toBeTruthy();
    })
  });

  describe('should retrieve truck from the API via PATCH', () => {
    const truck: ITruck =
      {
        "truckId": "1",
        "registration": "55-PP-88",
        "batteryCap": "3130",
        "maxBatteryCap": "3233",
        "electricRange": "370",
        "chargeTime": "22:22",
        "tareWeight": "60.000",
        "isActive": "true"
      };
      let updatedTruck: ITruck;
      const inactiveTruck: ITruck =
      {
        "truckId": "1",
        "registration": "55-PP-88",
        "batteryCap": "3130",
        "maxBatteryCap": "3233",
        "electricRange": "370",
        "chargeTime": "22:22",
        "tareWeight": "60.000",
        "isActive": "false"
      };

    it('should return the InactiveWarehouse after inhibit', () => { 

      service.markTruckAsInactive(truck).subscribe(data => {
        updatedTruck = data;

        expect(updatedTruck).toEqual(inactiveTruck);
 
      });

      const request = httpMock.expectOne(`${service.truckURL + '/inactivate/1'}`);
      expect(request.request.method).toEqual('PATCH');

      request.flush(inactiveTruck);
    })

  });

});
