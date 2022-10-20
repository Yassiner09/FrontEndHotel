import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceReservationDialogComponent } from './service-reservation-dialog.component';

describe('ServiceReservationDialogComponent', () => {
  let component: ServiceReservationDialogComponent;
  let fixture: ComponentFixture<ServiceReservationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceReservationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceReservationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
