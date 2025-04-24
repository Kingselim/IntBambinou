import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregnancyTracking2Component } from './pregnancy-tracking2.component';

describe('PregnancyTracking2Component', () => {
  let component: PregnancyTracking2Component;
  let fixture: ComponentFixture<PregnancyTracking2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PregnancyTracking2Component]
    });
    fixture = TestBed.createComponent(PregnancyTracking2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
