import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileFrontComponent } from './user-profile-front.component';

describe('UserProfileFrontComponent', () => {
  let component: UserProfileFrontComponent;
  let fixture: ComponentFixture<UserProfileFrontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileFrontComponent]
    });
    fixture = TestBed.createComponent(UserProfileFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
