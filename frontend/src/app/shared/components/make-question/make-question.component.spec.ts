import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeQuestionComponent } from './make-question.component';

describe('MakeQuestionComponent', () => {
  let component: MakeQuestionComponent;
  let fixture: ComponentFixture<MakeQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MakeQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
