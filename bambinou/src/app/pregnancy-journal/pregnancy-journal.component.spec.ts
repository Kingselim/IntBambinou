import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregnancyJournalComponent } from './pregnancy-journal.component';

describe('PregnancyJournalComponent', () => {
  let component: PregnancyJournalComponent;
  let fixture: ComponentFixture<PregnancyJournalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PregnancyJournalComponent]
    });
    fixture = TestBed.createComponent(PregnancyJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
