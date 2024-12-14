import { Component } from '@angular/core';
import { RoomService } from '../../../core/services/room/room.service';
import { IQuestion } from '../../../core/interfaces/question/question.interface';

@Component({
  selector: 'app-live-question-view',
  templateUrl: './live-question-view.component.html',
  styleUrl: './live-question-view.component.scss'
})
export class LiveQuestionViewComponent {
  question:IQuestion|null = null;
  alternatives: any = {};

  constructor(private roomService:RoomService){

  }

  ngAfterViewInit(){
    this.setup();
  }

  async setup(){
    if(this.question != null){
      const question_result = await this.roomService.getQuestionResult(this.question.id);

      this.alternatives = question_result?.alternatives || [];
    }

    this.roomService.subscribeRoom(async(msg)=>{
      if(msg.type != 'question_update') return false;
      if(msg.data?.id+1 != this.question?.id) return false;

      this.saveToAlternatives(msg.data);

      return true;
    });
  }

  saveToAlternatives(data:any){
    if(data == null) return;

    const alternatives = data.alternatives || [];
    const pickers = data.players || [];
    const pickers_count = pickers.length;

    const keys = Object.keys(alternatives).map(x => x.replace('id_', ''));

    const alternatives_arr = keys.map(x => ({[+x]: {
      count: alternatives['id_'+x],
      percent: 100/pickers_count*alternatives['id_'+x]
    }}));

    for(let alt of alternatives_arr)
      this.alternatives = {...this.alternatives, ...alt};
  }

  viewQuestion(id:number){

  }

  async setQuestion(question:IQuestion){
    this.question = question;

    const question_result = await this.roomService.getQuestionResult(this.question.id);

    this.saveToAlternatives(question_result);
  }
}