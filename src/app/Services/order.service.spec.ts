import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {IOrder} from "../Models/iorder.model";

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(OrderService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should retrieve order from the API via POST', () => {
    const order: IOrder =
      {
        "orderId": "121",
        "orderDescription": "teste"
      };

    it('should return the orderId', () => {
      service.addOrder(order).subscribe(order => {
        expect(order.orderId).toBe("121");
      });

      const request = httpMock.expectOne(`${service.orderURL}`);
      expect(request.request.method).toEqual('POST');

      request.flush(order);
    })

    it('should return true to create order', () => {
      expect(order).toBeTruthy();
    })
  });

  describe('should retrieve order from the API via PUT', () => {
    const order: IOrder =
      {
        "orderId": "121",
        "orderDescription": "teste"
      };

    it('should return the editedOrder after creating', () => {
      const editedOrder: IOrder =
        {
          "orderId": "121",
          "orderDescription": "orderDescription"
        };

      service.editOrder(editedOrder).subscribe(order => {
        expect(order.orderDescription).toBe("orderDescription");
      });

      const request = httpMock.expectOne(`${service.orderURL}`);
      expect(request.request.method).toEqual('PUT');

      request.flush(editedOrder);
    })
  });

  describe('should retrieve orders from the API via GET', () => {
    const dummyList: IOrder[] = [
      {
        "orderId": "121",
        "orderDescription": "teste"
      },
      {
        "orderId": "124",
        "orderDescription": "orderDescription",
      },
      {
        "orderId": "123",
        "orderDescription": "OrderDescription",
      },
      {
        "orderId": "125",
        "orderDescription": "OrderDescription5",
      }
    ];

    it('should return the same length', () => {
      service.getAllOrders().subscribe(orders => {
        expect(orders.length).toBe(4);
      });

      const request = httpMock.expectOne(`${service.orderURL}`);
      expect(request.request.method).toEqual('GET');

      request.flush(dummyList);
    })

    it('should return true to equal', () => {
      service.getAllOrders().subscribe(orders => {
        expect(orders).toEqual(dummyList);
      });

      const request = httpMock.expectOne(`${service.orderURL}`);
      expect(request.request.method).toEqual('GET');

      request.flush(dummyList);
    })
  });

});
