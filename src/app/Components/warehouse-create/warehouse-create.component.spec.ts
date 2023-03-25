import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from "@angular/forms";
import { WarehouseCreateComponent } from './warehouse-create.component';
import {HttpClientModule} from "@angular/common/http";

describe('WarehouseCreateComponent', () => {
  let component: WarehouseCreateComponent;
  let fixture: ComponentFixture<WarehouseCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseCreateComponent ],
      imports: [HttpClientModule, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
