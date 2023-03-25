import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteListComponent } from './route-list.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";

describe('RouteListComponent', () => {
  let component: RouteListComponent;
  let fixture: ComponentFixture<RouteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteListComponent ],
      imports: [HttpClientModule, FormsModule, NgxPaginationModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
