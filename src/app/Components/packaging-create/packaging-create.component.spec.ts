import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingCreateComponent } from './packaging-create.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

describe('PackagingCreateComponent', () => {
  let component: PackagingCreateComponent;
  let fixture: ComponentFixture<PackagingCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagingCreateComponent ],
      imports: [HttpClientModule, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackagingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
