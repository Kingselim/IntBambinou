import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregnancyJournalSectionComponent } from './pregnancy-journal-section.component';

describe('PregnancyJournalSectionComponent', () => {
  let component: PregnancyJournalSectionComponent;
  let fixture: ComponentFixture<PregnancyJournalSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PregnancyJournalSectionComponent]
    });
    fixture = TestBed.createComponent(PregnancyJournalSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
