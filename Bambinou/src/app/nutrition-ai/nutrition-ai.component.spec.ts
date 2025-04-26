import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionAiComponent } from './nutrition-ai.component';

describe('NutritionAiComponent', () => {
  let component: NutritionAiComponent;
  let fixture: ComponentFixture<NutritionAiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutritionAiComponent]
    });
    fixture = TestBed.createComponent(NutritionAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
