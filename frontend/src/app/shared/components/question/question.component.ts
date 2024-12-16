import { Component, Input, Output } from '@angular/core';
import { IQuestion } from '../../../core/interfaces/question/question.interface';
import { EventEmitter } from '@angular/core';
import { IAlternativeResult } from '../../../core/interfaces/room/alternatives_result.interface';
import { RoomService } from '../../../core/services/room/room.service';

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
  timeout_left:number = 0;
  interval:any = null;

  constructor(private roomService:RoomService){
    
  }

  lock = () => this.locked = true;
  unlock = () => this.locked = false;
  lockFor = (seconds:number) => {
    this.lock();
    setTimeout(this.unlock, seconds*1000);
  };

  ngAfterViewInit(){

  }

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

    this.setupTimeout();
  }

  setResult(alternatives_results:IAlternativeResult){
    this.finished = true;
    this.results = alternatives_results;
  }

  setupTimeout(){
    this.timeout_left = this.roomService?.live_room_data?.start_question_timeout || this.roomService?.connected_room?.question_timeout || 0;

    clearInterval(this.interval);

    this.interval = setInterval(() => {
      --this.timeout_left;
      if(this.timeout_left <= 0) clearInterval(this.interval);
    }, 1000);
  }
}
