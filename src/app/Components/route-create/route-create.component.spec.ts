import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteCreateComponent } from './route-create.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

describe('RouteCreateComponent', () => {
  let component: RouteCreateComponent;
  let fixture: ComponentFixture<RouteCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteCreateComponent ],
      imports: [HttpClientModule, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
