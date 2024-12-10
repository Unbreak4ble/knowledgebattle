import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IQuestion } from '../../../../core/interfaces/question/question.interface';
import { SharedModule } from '../../../../shared/shared.module';
import { MakeQuestionComponent } from '../../../../shared/components/make-question/make-question.component';
import { QuestionsListComponent } from '../../../../shared/components/questions-list/questions-list.component';
import { ToggleSwitchComponent } from '../../../../shared/components/toggle-switch/toggle-switch.component';
import { options } from './create-room.header';
import { RoomService } from '../../../../core/services/room/room.service';
import { MessageboxService } from '../../../../core/services/messagebox/messagebox.service';
import { MessageBoxComponent } from '../../../../shared/components/message-box/message-box.component';

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.scss'
})
export class CreateRoomComponent {
  messageBoxComponent:MessageBoxComponent|null = null;
  @ViewChild('make_question') makeQuestionComponent:MakeQuestionComponent|null = null;
  @ViewChild('questions_list') questionsListComponent:QuestionsListComponent|null = null;
  @ViewChildren('options') optionComponents:QueryList<ToggleSwitchComponent>|undefined;
  options:any[] = [];
  questions: IQuestion[] = [
    {
      id: 1,
      text: "untitled",
      alternatives: [
        {text: 'untitled alternative'}
      ],
      finished: false
    }
  ];

  constructor(private roomService: RoomService, private messageboxService:MessageboxService){

  }

  ngAfterViewInit(){
    this.messageBoxComponent = this.messageboxService.getComponent();
    
    this.setup();
  }

  async setup(){
    this.initEvents();

    this.questionsListComponent?.setQuestions(this.questions);

    this.options = await this.roomService.loadOptions();
  }

  initEvents(){
    this.questionsListComponent?.onViewQuestion(this.viewQuestion.bind(this));
  }

  viewQuestion(question:IQuestion){
    this.makeQuestionComponent?.setQuestion(question);
  }

  getConfig(){
    const result:any = {
      text: '',
      settings: []
    };

    const text_element:any = document.querySelector('.create-room-configs-title');

    result.text = text_element?.value || '';

    for(const opt of this.optionComponents || []){
      result.settings.push({
        id: opt.id,
        allow: opt.checked
      });
    }

    return result;
  }

  async create(){
    const configs = this.getConfig();
    const questions = this.questionsListComponent?.questions || [];

    const payload = {
      ...configs,
      questions: questions
    };

    const response = await this.roomService.createRoom(payload);

    if(response == null) return;

    this.roomService.saveToken(response.id, response.token);

    this.roomService.gotoAdminRoom(response.id);
  }
}