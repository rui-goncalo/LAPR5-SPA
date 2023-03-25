import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingListComponent } from './packaging-list.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";

describe('PackagingListComponent', () => {
  let component: PackagingListComponent;
  let fixture: ComponentFixture<PackagingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagingListComponent],
      imports: [HttpClientModule, FormsModule, NgxPaginationModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackagingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
