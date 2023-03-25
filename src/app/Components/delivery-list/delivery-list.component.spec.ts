import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryListComponent } from './delivery-list.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {Ng2OrderModule, Ng2OrderPipe} from "ng2-order-pipe";

describe('DeliveryListComponent', () => {
  let component: DeliveryListComponent;
  let fixture: ComponentFixture<DeliveryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryListComponent ],
      imports: [HttpClientModule, FormsModule, NgxPaginationModule, Ng2SearchPipeModule, Ng2OrderModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
