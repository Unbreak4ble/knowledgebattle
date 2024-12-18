import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteBubbleComponent } from './note-bubble.component';

describe('NoteBubbleComponent', () => {
  let component: NoteBubbleComponent;
  let fixture: ComponentFixture<NoteBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteBubbleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoteBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
