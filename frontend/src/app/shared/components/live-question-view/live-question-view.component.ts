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
  alternatives: any[] = [];

  constructor(private roomService:RoomService){

  }

  ngAfterViewInit(){
    this.setup();
  }

  async setup(){
    if(this.question == null) return;

    const question_result = await this.roomService.getQuestionResult(this.question.id);

    this.alternatives = question_result?.alternatives || [];

    this.roomService.subscribeRoom(async(msg)=>{
      if(msg.type != 'question_update') return false;
      if(msg.data?.id != this.question?.id) return false;

      this.alternatives = msg.data?.alternatives;

      return true;
    });
  }

  viewQuestion(id:number){

  }

  async setQuestion(question:IQuestion){
    if(this.question == null) return;

    const question_result = await this.roomService.getQuestionResult(this.question.id);

    this.alternatives = question_result?.alternatives || [];

    this.question = question;
  }
}