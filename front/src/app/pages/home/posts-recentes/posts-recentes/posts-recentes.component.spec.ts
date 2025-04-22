import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsRecentesComponent } from './posts-recentes.component';

describe('PostsRecentesComponent', () => {
  let component: PostsRecentesComponent;
  let fixture: ComponentFixture<PostsRecentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsRecentesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostsRecentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
