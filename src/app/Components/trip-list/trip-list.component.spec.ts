import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripListComponent } from './trip-list.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";

describe('TripListComponent', () => {
  let component: TripListComponent;
  let fixture: ComponentFixture<TripListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripListComponent ],
      imports: [HttpClientModule, FormsModule, NgxPaginationModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
