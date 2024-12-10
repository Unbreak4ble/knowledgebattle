import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { IQuestion } from '../../../core/interfaces/question/question.interface';

@Component({
  selector: 'app-questions-list-live',
  templateUrl: './questions-list-live.component.html',
  styleUrl: './questions-list-live.component.scss'
})
export class QuestionsListLiveComponent {
  questions: IQuestion[] = [];
  @Output('submit') onSubmit: EventEmitter<IQuestion[]> = new EventEmitter();
  _viewQuestion: ((question: IQuestion) => void)|undefined;

  constructor(private changeDetectRf: ChangeDetectorRef){

  }

  ngAfterViewInit(){
    
  }

  onViewQuestion = (callback:(question:IQuestion)=>void) => this._viewQuestion = callback;

  fixIds(){
    this.questions = this.questions.map((q,i) => {q.id = i+1; return q});
  }

  viewQuestion(question: IQuestion){
    this._viewQuestion?.(question);
  }

  setQuestions(questions:IQuestion[]){
    this.questions = questions;
    this.changeDetectRf.detectChanges();
  }
}
