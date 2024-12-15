import { Component, Input, Output } from '@angular/core';
import { IQuestion } from '../../../core/interfaces/question/question.interface';
import { EventEmitter } from '@angular/core';
import { IAlternativeResult } from '../../../core/interfaces/room/alternatives_result.interface';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {
  @Input('question') question: IQuestion|null = null;
  @Input('selected') selected_id: {id: Number|null} = {id: null};
  @Output('onpick') onPickEmitter: EventEmitter<any> = new EventEmitter<any>;
  locked:Boolean = false;
  finished:Boolean = false;
  results: IAlternativeResult = {};

  constructor(){
    
  }

  lock = () => this.locked = true;
  unlock = () => this.locked = false;
  lockFor = (seconds:number) => {
    this.lock();
    setTimeout(this.unlock, seconds*1000);
  };

  async onAlternativePick(id:Number|null){
    if(this.locked) return;

    await new Promise(resolve => setTimeout(resolve, 1)); // timeout for changes

    const element:any = document.getElementById("alternative_"+this.question?.id+"_"+id);

    if(id == null || element == null || this.question == null) return;

    element.checked = true;

    this.selected_id.id = id;

    this.onPickEmitter.emit({question_id: this.question.id, alternative_id: id});
  }

  setQuestion(question: IQuestion|null){
    this.question = question;
    this.finished = false;
    this.results = {};
  }

  setResult(alternatives_results:IAlternativeResult){
    this.finished = true;
    this.results = alternatives_results;
  }
}
