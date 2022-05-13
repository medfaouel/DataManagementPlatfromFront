import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillAllMasterDetailsComponent } from './fill-all-master-details.component';

describe('FillAllMasterDetailsComponent', () => {
  let component: FillAllMasterDetailsComponent;
  let fixture: ComponentFixture<FillAllMasterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillAllMasterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FillAllMasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
