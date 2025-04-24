import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyTrackingComponent } from './monthly-tracking.component';

describe('MonthlyTrackingComponent', () => {
  let component: MonthlyTrackingComponent;
  let fixture: ComponentFixture<MonthlyTrackingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyTrackingComponent]
    });
    fixture = TestBed.createComponent(MonthlyTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
