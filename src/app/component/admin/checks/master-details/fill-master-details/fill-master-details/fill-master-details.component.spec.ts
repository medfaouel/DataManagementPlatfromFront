import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillMasterDetailsComponent } from './fill-master-details.component';

describe('FillMasterDetailsComponent', () => {
  let component: FillMasterDetailsComponent;
  let fixture: ComponentFixture<FillMasterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillMasterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FillMasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
