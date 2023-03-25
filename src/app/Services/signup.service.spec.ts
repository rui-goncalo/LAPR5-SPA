import { TestBed } from '@angular/core/testing';
import { SignupService } from './signup.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";


describe('SignupService', () => {
  let service: SignupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignupService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SignupService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

