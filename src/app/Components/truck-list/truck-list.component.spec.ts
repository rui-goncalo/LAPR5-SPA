import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckListComponent } from './truck-list.component';
import {TruckCreateComponent} from "../truck-create/truck-create.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

describe('TruckListComponent', () => {
  let component: TruckListComponent;
  let fixture: ComponentFixture<TruckListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruckListComponent ],
      imports: [HttpClientModule, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
