import { Component, Input } from '@angular/core';
import { IQuestion } from '../../../core/interfaces/question/question.interface';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {
  @Input('question') question: IQuestion|null = null;
  selected_id: number|null = null;

  constructor(){
    
  }

  onAlternativePick(id:number){
    const element:any = document.getElementById("alternative_"+this.question?.id+"_"+id);

    if(element == null) return;

    element.checked = true;

    this.selected_id = id;
  }
}
