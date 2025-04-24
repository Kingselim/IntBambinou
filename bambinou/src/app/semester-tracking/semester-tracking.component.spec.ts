import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterTrackingComponent } from './semester-tracking.component';

describe('SemesterTrackingComponent', () => {
  let component: SemesterTrackingComponent;
  let fixture: ComponentFixture<SemesterTrackingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SemesterTrackingComponent]
    });
    fixture = TestBed.createComponent(SemesterTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
