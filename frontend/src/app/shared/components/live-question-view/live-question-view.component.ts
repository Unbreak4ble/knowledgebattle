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

  constructor(private roomService:RoomService){

  }

  viewQuestion(id:number){

  }

  setQuestion(question:IQuestion){
    this.question = question;
  }
}