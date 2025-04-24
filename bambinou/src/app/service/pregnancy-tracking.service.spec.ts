import { TestBed } from '@angular/core/testing';
import { ForumService } from './forum.service';

import { PregnancyTrackingService } from './pregnancy-tracking.service';

describe('PregnancyTrackingService', () => {
  let service: PregnancyTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PregnancyTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
