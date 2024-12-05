import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IQuestion } from '../../../../core/interfaces/question/question.interface';
import { SharedModule } from '../../../../shared/shared.module';
import { MakeQuestionComponent } from '../../../../shared/components/make-question/make-question.component';
import { QuestionsListComponent } from '../../../../shared/components/questions-list/questions-list.component';
import { ToggleSwitchComponent } from '../../../../shared/components/toggle-switch/toggle-switch.component';
import { options } from './create-room.header';

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.scss'
})
export class CreateRoomComponent {
  @ViewChild('make_question') makeQuestionComponent:MakeQuestionComponent|null = null;
  @ViewChild('questions_list') questionsListComponent:QuestionsListComponent|null = null;
  @ViewChildren('options') optionComponents:QueryList<ToggleSwitchComponent>|undefined;
  readonly options = options;
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
    this.setup();
  }

  setup(){
    this.initEvents();
  }

  initEvents(){
    this.questionsListComponent?.onViewQuestion(this.viewQuestion.bind(this));
  }

  viewQuestion(question:IQuestion){
    this.makeQuestionComponent?.setQuestion(question);
  }

  create(){
    const configs = {};
    const questions = this.questionsListComponent?.questions || [];



    const final_payload = {
      ...configs,
      questions: questions
    };

    console.log(final_payload);
  }
}
