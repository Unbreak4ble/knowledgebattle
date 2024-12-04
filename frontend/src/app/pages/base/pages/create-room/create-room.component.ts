import { Component, ViewChild } from '@angular/core';
import { IQuestion } from '../../../../core/interfaces/question/question.interface';
import { SharedModule } from '../../../../shared/shared.module';
import { MakeQuestionComponent } from '../../../../shared/components/make-question/make-question.component';

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.scss'
})
export class CreateRoomComponent {
  @ViewChild('make_question') makeQuestionComponent:MakeQuestionComponent|null = null;
  questions: IQuestion[] = [
    {
      id: 1,
      text: "untitled",
      alternatives: [
        {text: 'untitled alternative'}
      ]
    }
  ];

  constructor(){

  }

  ngAfterViewInit(){
    
  }

  viewQuestion(question:IQuestion){
    this.makeQuestionComponent?.setQuestion(question);
  }

  fixIds(){
    this.questions = this.questions.map((q,i) => {q.id = i+1; return q});
  }

  createQuestion(){
    this.questions.push({
      id: this.questions.length+1,
      text: "untitled",
      alternatives: []
    });
  }

  deleteQuestion(index:number){
    this.questions[index].id = -1;
    this.questions.splice(index, 1);
    this.fixIds();
  }
}
