import { TestBed } from '@angular/core/testing';

import { TrackingContextService } from './tracking-context.service';

describe('TrackingContextService', () => {
  let service: TrackingContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackingContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
