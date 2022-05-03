import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MasterDetailssComponent} from "./master-details.component";


describe('MasterDetailsComponent', () => {
  let component: MasterDetailssComponent;
  let fixture: ComponentFixture<MasterDetailssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterDetailssComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDetailssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
