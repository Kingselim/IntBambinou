import { TestBed } from '@angular/core/testing';

import { PregnancyJournalService } from './pregnancy-journal.service';

describe('PregnancyJournalService', () => {
  let service: PregnancyJournalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PregnancyJournalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
