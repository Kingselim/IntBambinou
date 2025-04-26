import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsBComponent } from './posts-b.component';

describe('PostsBComponent', () => {
  let component: PostsBComponent;
  let fixture: ComponentFixture<PostsBComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostsBComponent]
    });
    fixture = TestBed.createComponent(PostsBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
