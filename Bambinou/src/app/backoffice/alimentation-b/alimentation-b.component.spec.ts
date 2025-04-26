import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentationBComponent } from './alimentation-b.component';

describe('AlimentationBComponent', () => {
  let component: AlimentationBComponent;
  let fixture: ComponentFixture<AlimentationBComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlimentationBComponent]
    });
    fixture = TestBed.createComponent(AlimentationBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
