import { TestBed } from '@angular/core/testing';

import { PackagingService } from './packaging.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {IPackaging} from "../Models/ipackaging.model";

describe('PackagingService', () => {
  let service: PackagingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PackagingService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should retrieve packaging from the API via POST', () => {
    const packaging: IPackaging =
      {
        "packagingId": "1",
        "packagingX": "1",
        "packagingY": "1",
        "packagingZ": "1",
        "packagingTruck": "1"
      };

    it('should return the packagingId', () => {
      service.addPackaging(packaging).subscribe(packaging => {
        expect(packaging.packagingId).toBe("1");
      });

      const request = httpMock.expectOne(`${service.packagingURL}`);
      expect(request.request.method).toEqual('POST');

      request.flush(packaging);
    })

    it('should return true to create packaging', () => {
      expect(packaging).toBeTruthy();
    })
  });

  describe('should retrieve route from the API via PUT', () => {
    const packaging: IPackaging =
      {
        "packagingId": "1",
        "packagingX": "1",
        "packagingY": "1",
        "packagingZ": "1",
        "packagingTruck": "1"
      };

    it('should return the editedRoute after creating', () => {
      const editedPackaging: IPackaging =
        {
          "packagingId": "1",
          "packagingX": "1",
          "packagingY": "1",
          "packagingZ": "6",
          "packagingTruck": "1"
        };

      service.editPackaging(editedPackaging).subscribe(packaging => {
        expect(packaging.packagingZ).toBe("6");
      });

      const request = httpMock.expectOne(`${service.packagingURL}`);
      expect(request.request.method).toEqual('PUT');

      request.flush(editedPackaging);
    })
  });

  describe('should retrieve routes from the API via GET', () => {
    const dummyList: IPackaging[] = [
      {
        "packagingId": "1",
        "packagingX": "1",
        "packagingY": "1",
        "packagingZ": "1",
        "packagingTruck": "1"
      },
      {
        "packagingId": "2",
        "packagingX": "1",
        "packagingY": "2",
        "packagingZ": "1",
        "packagingTruck": "1"
      },
      {
        "packagingId": "3",
        "packagingX": "1",
        "packagingY": "1",
        "packagingZ": "2",
        "packagingTruck": "1"
      }
    ];

    it('should return the same length', () => {
      service.getAllPackagings().subscribe(packaging => {
        expect(packaging.length).toBe(3);
      });

      const request = httpMock.expectOne(`${service.packagingURL}`);
      expect(request.request.method).toEqual('GET');

      request.flush(dummyList);
    })

    it('should return true to equal', () => {
      service.getAllPackagings().subscribe(packaging => {
        expect(packaging).toEqual(dummyList);
      });

      const request = httpMock.expectOne(`${service.packagingURL}`);
      expect(request.request.method).toEqual('GET');

      request.flush(dummyList);
    })
  });
});
