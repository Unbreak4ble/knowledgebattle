import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { IQuestion } from '../../../core/interfaces/question/question.interface';
import { RoomService } from '../../../core/services/room/room.service';

@Component({
  selector: 'app-questions-list-live',
  templateUrl: './questions-list-live.component.html',
  styleUrl: './questions-list-live.component.scss'
})
export class QuestionsListLiveComponent {
  questions: IQuestion[] = [];
  @Output('submit') onSubmit: EventEmitter<IQuestion[]> = new EventEmitter();
  _viewQuestion: ((question: IQuestion) => void)|undefined;

  constructor(private changeDetectRf: ChangeDetectorRef, private roomService: RoomService){

  }

  ngAfterViewInit(){
    this.setup();
  }

  onViewQuestion = (callback:(question:IQuestion)=>void) => this._viewQuestion = callback;

  fixIds(){
    this.questions = this.questions.map((q,i) => {q.id = i+1; return q});
  }

  async setup(){
    await this.roomService.waitForJoin();
    
    const room = await this.roomService.getRoomById(this.roomService._connected_id || '');

    if(room == null) return;

    this.questions = room.questions;

    this.roomService.subscribeRoom(async (msg)=>{
      if(msg.type != 'new_question') return false;

      const new_questions = msg.data?.questions || [];

      this.questions = this.questions.concat(new_questions);

      this.changeDetectRf.detectChanges();

      return true;
    });
  }

  viewQuestion(question: IQuestion){
    this._viewQuestion?.(question);
  }

  setQuestions(questions:IQuestion[]){
    this.questions = questions;
    this.changeDetectRf.detectChanges();
  }
}
