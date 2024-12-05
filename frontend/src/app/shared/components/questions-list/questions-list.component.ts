import { ChangeDetectorRef, Component } from '@angular/core';
import { IQuestion } from '../../../core/interfaces/question/question.interface';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrl: './questions-list.component.scss'
})
export class QuestionsListComponent {
  questions: IQuestion[] = [];
  _createQuestion: (() => void)|undefined;
  _viewQuestion: ((question: IQuestion) => void)|undefined;
  _deleteQuestion: ((index:number) => void)|undefined;

  constructor(private changeDetectRf: ChangeDetectorRef){

  }

  ngAfterViewInit(){

  }

  onCreateQuestion = (callback: () => void) => this._createQuestion = callback;
  onViewQuestion = (callback:(question:IQuestion)=>void) => this._viewQuestion = callback;
  onDeleteQuestion = (callback: (index:number)=>void) => this._deleteQuestion = callback;

  fixIds(){
    this.questions = this.questions.map((q,i) => {q.id = i+1; return q});
  }

  createQuestion(){
    this._createQuestion?.();

    this.questions.push({
      id: this.questions.length+1,
      text: "untitled",
      alternatives: []
    });
  }

  viewQuestion(question: IQuestion){
    this._viewQuestion?.(question);
  }

  deleteQuestion(index:number){
    this._deleteQuestion?.(index);

    this.questions[index].id = -1;
    this.questions.splice(index, 1);
    this.fixIds();
  }

  setQuestions(questions:IQuestion[]){
    this.questions = questions;
    this.changeDetectRf.detectChanges();
  }
}
