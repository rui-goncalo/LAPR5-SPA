import { TestBed } from '@angular/core/testing';

import { WarehouseService } from './warehouse.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {IWarehouse} from "../Models/iwarehouse.model";

describe('WarehouseCreateService', () => {
  let service: WarehouseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WarehouseService],
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(WarehouseService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('should retrieve warehouse from the API via POST', () => {
    const warehouse: IWarehouse =
      {
        "warehouseId": "1",
        "warehouseAddress": "123",
        "warehouseDesignation": "designation",
        "warehouseGeoCoord": "350"
      };

    it('should return the warehouseId', () => {
      service.addWarehouse(warehouse).subscribe(warehouse => {
        expect(warehouse.warehouseId).toBe("1");
      });

      const request = httpMock.expectOne(`${service.warehouseURL}`);
      expect(request.request.method).toEqual('POST');

      request.flush(warehouse);
    })

    it('should return true to create warehouse', () => {
      expect(warehouse).toBeTruthy();
    })
  });

  describe('should retrieve warehouse from the API via PUT', () => {
    const warehouse: IWarehouse =
      {
        "warehouseId": "1",
        "warehouseAddress": "123",
        "warehouseDesignation": "designation",
        "warehouseGeoCoord": "350"
      };

    it('should return the editedWarehouse after creating', () => {
      const editedWarehouse: IWarehouse =
        {
          "warehouseId": "1",
          "warehouseAddress": "123",
          "warehouseDesignation": "designation2",
          "warehouseGeoCoord": "350"
        };

      service.editWarehouse(editedWarehouse).subscribe(warehouse => {
        expect(warehouse.warehouseDesignation).toBe("designation2");
      });

      const request = httpMock.expectOne(`${service.warehouseURL}`);
      expect(request.request.method).toEqual('PUT');

      request.flush(editedWarehouse);
    })
  });

  describe('should retrieve warehouse from the API via put', () => {
    const warehouse: IWarehouse =
      {
        "warehouseId": "130",
        "warehouseAddress": "Rua de Arouca",
        "warehouseDesignation": "Arouca",
        "warehouseGeoCoord": "13.13° N, 120.12° W"
      };
      let inactiveWarehouse: IWarehouse;

    it('should return the InactiveWarehouse after inhibit', () => { 

      service.markWarehouseAsInactive(warehouse).subscribe(data => {
        inactiveWarehouse = data;

        expect(inactiveWarehouse).toEqual(warehouse);
 
      });

      const request = httpMock.expectOne(`${service.warehouseURL + '/inactivate/130'}`);
      expect(request.request.method).toEqual('PUT');

      request.flush(warehouse);
    })

  });

  describe('should retrieve warehouse from the API via GET', () => {
    const warehouse: IWarehouse =
      {
        "warehouseId": "130",
        "warehouseAddress": "Rua de Arouca",
        "warehouseDesignation": "Arouca",
        "warehouseGeoCoord": "13.13° N, 120.12° W"
      };
      let inactiveWarehouse: IWarehouse;
      let isActive: boolean;
      let inativo: boolean= false;

    it('should return the false after inhibit', () => { 

      service.markWarehouseAsInactive(warehouse).subscribe(data => {
      inactiveWarehouse = data;
      service.checkActivatedWarehouse(inactiveWarehouse.warehouseId).subscribe(data => {
        isActive = data;

        expect(isActive).toEqual(inativo);
 
      });
    });

    const request2 = httpMock.expectOne(`${service.warehouseURL + '/inactivate/130'}`);
    expect(request2.request.method).toEqual('PUT');

    request2.flush(warehouse);

      const request = httpMock.expectOne(`${service.warehouseURL + '/checkactivated/130'}`);
      expect(request.request.method).toEqual('GET');

      request.flush(inativo);
    })

  });


  describe('should retrieve warehouses from the API via GET', () => {
    const dummyList: IWarehouse[] = [
      {
        "warehouseId": "1",
        "warehouseAddress": "123",
        "warehouseDesignation": "designation",
        "warehouseGeoCoord": "350"
      },
      {
        "warehouseId": "2",
        "warehouseAddress": "345",
        "warehouseDesignation": "designation2",
        "warehouseGeoCoord": "500"
      }
    ];

    it('should return the same length', () => {
      service.getAllWarehouses().subscribe(warehouses => {
        expect(warehouses.length).toBe(2);
      });

      const request = httpMock.expectOne(`${service.warehouseURL}`);
      expect(request.request.method).toEqual('GET');

      request.flush(dummyList);
    })

    it('should return true to equal', () => {
      service.getAllWarehouses().subscribe(warehouses => {
        expect(warehouses).toEqual(dummyList);
      });

      const request = httpMock.expectOne(`${service.warehouseURL}`);
      expect(request.request.method).toEqual('GET');

      request.flush(dummyList);
    })
  });

});
