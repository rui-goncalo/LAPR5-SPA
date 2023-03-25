import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingEditComponent } from './packaging-edit.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

describe('PackagingEditComponent', () => {
  let component: PackagingEditComponent;
  let fixture: ComponentFixture<PackagingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagingEditComponent ],
      imports: [HttpClientModule, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackagingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
