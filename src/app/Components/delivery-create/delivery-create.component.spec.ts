import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from "@angular/forms";
import { DeliveryCreateComponent } from './delivery-create.component';
import {HttpClientModule} from "@angular/common/http";

describe('DeliveryCreateComponent', () => {
  let component: DeliveryCreateComponent;
  let fixture: ComponentFixture<DeliveryCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryCreateComponent ],
      imports: [HttpClientModule, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
