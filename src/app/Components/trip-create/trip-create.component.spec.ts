import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripCreateComponent } from './trip-create.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

describe('TripCreateComponent', () => {
  let component: TripCreateComponent;
  let fixture: ComponentFixture<TripCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripCreateComponent ],
      imports: [HttpClientModule, FormsModule]

    })
    .compileComponents();

    fixture = TestBed.createComponent(TripCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
