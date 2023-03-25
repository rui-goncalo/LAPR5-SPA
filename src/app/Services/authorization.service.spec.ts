import { TestBed } from '@angular/core/testing';
import { AuthorizationService } from './authorization.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('AuthorizationService', () => {
  let service: AuthorizationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorizationService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthorizationService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
