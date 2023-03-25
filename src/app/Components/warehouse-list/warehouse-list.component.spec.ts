import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseListComponent } from './warehouse-list.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

describe('WarehouseListComponent', () => {
  let component: WarehouseListComponent;
  let fixture: ComponentFixture<WarehouseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseListComponent],
      imports: [HttpClientModule, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
