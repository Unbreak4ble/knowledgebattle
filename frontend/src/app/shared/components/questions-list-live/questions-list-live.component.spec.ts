import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsListLiveComponent } from './questions-list-live.component';

describe('QuestionsListComponent', () => {
  let component: QuestionsListLiveComponent;
  let fixture: ComponentFixture<QuestionsListLiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionsListLiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionsListLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
