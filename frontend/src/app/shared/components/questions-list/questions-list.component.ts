import { ChangeDetectorRef, Component } from '@angular/core';
import { IQuestion } from '../../../core/interfaces/question/question.interface';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { MessageboxService } from '../../../core/services/messagebox/messagebox.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrl: './questions-list.component.scss'
})
export class QuestionsListComponent {
  messageBoxComponent:MessageBoxComponent|null = null;
  questions: IQuestion[] = [];
  _createQuestion: (() => void)|undefined;
  _viewQuestion: ((question: IQuestion) => void)|undefined;
  _deleteQuestion: ((index:number) => void)|undefined;

  constructor(private changeDetectRf: ChangeDetectorRef, private messageboxService:MessageboxService){

  }

  ngAfterViewInit(){
    this.messageBoxComponent = this.messageboxService.getComponent();
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

  async deleteQuestion(index:number){

    const result = await new Promise(resolve => this.messageBoxComponent?.confirm("prompt", "Do you really want to delete #"+(index+1)+" question ?", resolve));

    if(!result) return;

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
