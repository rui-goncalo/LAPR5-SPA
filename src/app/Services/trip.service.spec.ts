import { TestBed } from '@angular/core/testing';

import { TripService } from './trip.service';
import {RouteService} from "./route.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('TripService', () => {
  let service: TripService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TripService],
      imports: [HttpClientTestingModule]

    });
    service = TestBed.inject(TripService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
