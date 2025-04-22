import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosPostComponent } from './filtros-post.component';

describe('FiltrosPostComponent', () => {
  let component: FiltrosPostComponent;
  let fixture: ComponentFixture<FiltrosPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltrosPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
