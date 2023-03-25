import { ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from "@angular/forms";
import { AnonimyzeUserDataComponent } from './anonimyze-user-data.component';
import {HttpClientModule} from "@angular/common/http";

describe('AnonimyzeUserDataComponent', () => {
  let component: AnonimyzeUserDataComponent;
  let fixture: ComponentFixture<AnonimyzeUserDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnonimyzeUserDataComponent ],
      imports: [HttpClientModule, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnonimyzeUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
