import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseEditComponent } from './warehouse-edit.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

describe('WarehouseEditComponent', () => {
  let component: WarehouseEditComponent;
  let fixture: ComponentFixture<WarehouseEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseEditComponent ],
      imports: [HttpClientModule, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
