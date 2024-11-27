import { Component } from '@angular/core';
import { questions } from './questions-carousel.headers';
import { IQuestion } from '../../../core/interfaces/question/question.interface';

@Component({
  selector: 'app-questions-carousel',
  templateUrl: './questions-carousel.component.html',
  styleUrl: './questions-carousel.component.scss'
})
export class QuestionsCarouselComponent {
  questions: any[] = questions;
  question_previous: IQuestion|null = null;
  question: IQuestion|null = null;
  question_next: IQuestion|null = null;
  current_idx:number = 1;

  constructor(){
    this.setup();
  }

  setup(){
    this.jumpTo(1);
  }

  jumpTo(index:number){
    this.current_idx = index;
    
    if(this.current_idx > 0){
      this.question_previous = this.questions[this.current_idx-1];
    }else{
      this.question_previous = null;
    }

    this.question = this.questions[this.current_idx];
    
    if(this.current_idx+1 < this.questions.length){
      this.question_next = this.questions[this.current_idx+1];
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
}
