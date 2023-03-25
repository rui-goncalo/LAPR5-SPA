import { IDelivery } from './../Models/idelivery.model';
import { TestBed } from '@angular/core/testing';

import { DeliveryService } from './delivery.service';
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('DeliveryService', () => {
  let service: DeliveryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeliveryService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DeliveryService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should retrieve delivery from the API via POST', () => {
    const delivery: IDelivery =
      {
        "deliveryId": "123",
        "deliveryDate": "07-12-2022",
        "mass": "10",
        "warehouseId": "121",
        "loadTime": "10",
        "unloadTime": "20"
      };

    it('should return the deliveryId', () => {
      service.addDelivery(delivery).subscribe(delivery => {
        expect(delivery.deliveryId).toBe("123");
      });

      const request = httpMock.expectOne(`${service.deliveryURL}`);
      expect(request.request.method).toEqual('POST');

      request.flush(delivery);
    })

    it('should return true to create delivery', () => {
      expect(delivery).toBeTruthy();
    })
  });

  describe('should retrieve delivery from the API via PUT', () => {
    const delivery: IDelivery =
      {
        "deliveryId": "123",
        "deliveryDate": "07-12-2022",
        "mass": "10",
        "warehouseId": "121",
        "loadTime": "10",
        "unloadTime": "20"
      };

    it('should return the editedDelivery after creating', () => {
      const editedDelivery: IDelivery =
        {
          "deliveryId": "124",
          "deliveryDate": "08-12-2022",
          "mass": "30",
          "warehouseId": "121",
          "loadTime": "10",
          "unloadTime": "20"
        };

      service.editDelivery(editedDelivery).subscribe(delivery => {
        expect(delivery.deliveryDate).toBe("08-12-2022");
      });

      const request = httpMock.expectOne(`${service.deliveryURL}`);
      expect(request.request.method).toEqual('PUT');

      request.flush(editedDelivery);
    })
  });

  describe('should retrieve deliveries from the API via GET', () => {
    const dummyList: IDelivery[] = [
      {
        "deliveryId": "123",
        "deliveryDate": "08-12-2022",
        "mass": "10",
        "warehouseId": "121",
        "loadTime": "10",
        "unloadTime": "20",
      },
      {
        "deliveryId": "124",
        "deliveryDate": "09-12-2022",
        "mass": "20",
        "warehouseId": "122",
        "loadTime": "10",
        "unloadTime": "20",
      },
      {
        "deliveryId": "125",
        "deliveryDate": "08-12-2022",
        "mass": "5",
        "warehouseId": "121",
        "loadTime": "10",
        "unloadTime": "10",
      },
      {
        "deliveryId": "126",
        "deliveryDate": "11-12-2022",
        "mass": "100",
        "warehouseId": "123",
        "loadTime": "20",
        "unloadTime": "30",
      }
    ];

    it('should return the same length', () => {
      service.getAllDeliveries().subscribe(deliveries => {
        expect(deliveries.length).toBe(4);
      });

      const request = httpMock.expectOne(`${service.deliveryURL}`);
      expect(request.request.method).toEqual('GET');

      request.flush(dummyList);
    })

    it('should return true to equal', () => {
      service.getAllDeliveries().subscribe(deliveries => {
        expect(deliveries).toEqual(dummyList);
      });

      const request = httpMock.expectOne(`${service.deliveryURL}`);
      expect(request.request.method).toEqual('GET');

      request.flush(dummyList);
    })
  });
});
