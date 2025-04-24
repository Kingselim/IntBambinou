import { TestBed } from '@angular/core/testing';

import { MinichatService } from './minichat.service';

describe('MinichatService', () => {
  let service: MinichatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinichatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
