import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostBComponent } from './post-b.component';

describe('PostBComponent', () => {
  let component: PostBComponent;
  let fixture: ComponentFixture<PostBComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostBComponent]
    });
    fixture = TestBed.createComponent(PostBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
