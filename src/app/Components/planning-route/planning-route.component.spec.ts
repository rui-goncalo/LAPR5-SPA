import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningRouteComponent } from './planning-route.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

describe('PlanningRouteComponent', () => {
  let component: PlanningRouteComponent;
  let fixture: ComponentFixture<PlanningRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningRouteComponent ],
      imports: [HttpClientModule, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanningRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
