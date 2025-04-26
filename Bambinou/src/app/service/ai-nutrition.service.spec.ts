import { TestBed } from '@angular/core/testing';

import { AiNutritionService } from './ai-nutrition.service';

describe('AiNutritionService', () => {
  let service: AiNutritionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiNutritionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
