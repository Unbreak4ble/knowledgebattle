import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsStepformComponent } from './questions-stepform.component';

describe('QuestionsStepformComponent', () => {
  let component: QuestionsStepformComponent;
  let fixture: ComponentFixture<QuestionsStepformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionsStepformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionsStepformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
