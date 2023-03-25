import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryEditComponent } from './delivery-edit.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

describe('DeliveryEditComponent', () => {
  let component: DeliveryEditComponent;
  let fixture: ComponentFixture<DeliveryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryEditComponent ],
      imports: [HttpClientModule, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
