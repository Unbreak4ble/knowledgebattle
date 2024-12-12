import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveQuestionViewComponent } from './live-question-view.component';

describe('LiveQuestionViewComponent', () => {
  let component: LiveQuestionViewComponent;
  let fixture: ComponentFixture<LiveQuestionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveQuestionViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiveQuestionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
