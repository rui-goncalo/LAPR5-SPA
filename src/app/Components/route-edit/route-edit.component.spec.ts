import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteEditComponent } from './route-edit.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

describe('RouteEditComponent', () => {
  let component: RouteEditComponent;
  let fixture: ComponentFixture<RouteEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteEditComponent ],
      imports: [HttpClientModule, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
