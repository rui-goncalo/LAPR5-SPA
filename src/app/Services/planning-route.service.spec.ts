import { TestBed } from '@angular/core/testing';

import { PlanningRouteService } from './planning-route.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";


describe('PlanningRouteService', () => {
  let service: PlanningRouteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanningRouteService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PlanningRouteService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
