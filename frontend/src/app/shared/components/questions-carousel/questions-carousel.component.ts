import { Component, ViewChild, ViewChildren } from '@angular/core';
import { questions } from './questions-carousel.headers';
import { IQuestion } from '../../../core/interfaces/question/question.interface';
import { QuestionComponent } from '../question/question.component';
import { RoomService } from '../../../core/services/room/room.service';

@Component({
  selector: 'app-questions-carousel',
  templateUrl: './questions-carousel.component.html',
  styleUrl: './questions-carousel.component.scss'
})
export class QuestionsCarouselComponent {
  @ViewChild('current_question') question_component:QuestionComponent|null = null;
  @ViewChild('previous_question') previous_question_component:QuestionComponent|null = null;
  @ViewChild('next_question') next_question_component:QuestionComponent|null = null;
  questions: any[] = questions;
  question_previous: IQuestion|null = null;
  question: IQuestion|null = null;
  question_next: IQuestion|null = null;
  selected_list: any[] = [];
  current_selected: {id: Number|null} = {id: null};
  current_idx:number = 1;
  show_left_button:Boolean = true;
  show_right_button:Boolean = true;

  constructor(private roomService: RoomService){
    
  }

  async setup(){
    await this.setupEvent();

    this.jumpTo(0);
  }

  ngAfterViewInit(){
    /*
    const results:any[] = [
      {
        text: 'eae',
        count: 123,
        percent: 25
      },
      {
        text: '123',
        count: 100,
        percent: 50
      },
      {
        text: 'eae',
        count: 123,
        percent: 15
      },
      {
        text: 'eae',
        count: 123,
        percent: 10
      },
    ];
    this.question_component?.setResult(results);
    */
    
    this.setup();
  }

  jumpTo(index:number){
    this.current_idx = index;
    
    if(this.show_left_button = (this.current_idx > 0)){
      this.question_previous = this.questions[this.current_idx-1];
      this.previous_question_component?.onAlternativePick(this.question_previous ? this.selected_list[this.question_previous?.id] : null);
    }else{
      this.question_previous = null;
    }

    this.question = this.questions[this.current_idx];
    this.current_selected.id = this.selected_list[this.question?.id || 0];
    this.question_component?.onAlternativePick(this.current_selected.id);
    
    if(this.show_right_button = (this.current_idx+1 < this.questions.length)){
      this.question_next = this.questions[this.current_idx+1];
      this.next_question_component?.onAlternativePick(this.question_next ? this.selected_list[this.question_next?.id] : null)
    }else{
      this.question_next = null;
    }
  }

  jumpBack(){
    if(this.current_idx <= 0) return;

    this.jumpTo(this.current_idx-1);
  }

  jumpNext(){
    if(this.current_idx+1 >= this.questions.length) return;

    this.jumpTo(this.current_idx+1);
  }

  onPickEvent(event:any){
    this.selected_list[event.question_id] = event.alternative_id;

    this.current_selected.id = event.alternative_id;

    this.roomService.sendAnswer(event.alternative_id);

    this.question_component?.lock();
  }

  async setupEvent(){
    this.roomService.subscribeRoom(async(msg)=>{
      if(msg.type != 'question') return false;

      this.question = msg.data;

      return true;
    });
  }
}
