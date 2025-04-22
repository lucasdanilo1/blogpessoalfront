import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusPostsComponent } from './meus-posts.component';

describe('MeusPostsComponent', () => {
  let component: MeusPostsComponent;
  let fixture: ComponentFixture<MeusPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeusPostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeusPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
