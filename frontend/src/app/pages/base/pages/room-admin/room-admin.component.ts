import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MessageboxService } from '../../../../core/services/messagebox/messagebox.service';
import { MessageBoxComponent } from '../../../../shared/components/message-box/message-box.component';
import { RoomService } from '../../../../core/services/room/room.service';
import { ToggleSwitchComponent } from '../../../../shared/components/toggle-switch/toggle-switch.component';
import { QuestionsListComponent } from '../../../../shared/components/questions-list/questions-list.component';
import { MakeQuestionComponent } from '../../../../shared/components/make-question/make-question.component';
import { IQuestion } from '../../../../core/interfaces/question/question.interface';
import { SharedModule } from '../../../../shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { QuestionsListLiveComponent } from '../../../../shared/components/questions-list-live/questions-list-live.component';

@Component({
  selector: 'app-room-admin',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './room-admin.component.html',
  styleUrl: './room-admin.component.scss'
})
export class RoomAdminComponent {
  messageBoxComponent:MessageBoxComponent|null = null;
  @ViewChild('make_question') makeQuestionComponent:MakeQuestionComponent|null = null;
  @ViewChild('questions_list') questionsListComponent:QuestionsListComponent|null = null;
  @ViewChild('questions_list_live') questionsListLiveComponent:QuestionsListLiveComponent|null = null;
  @ViewChildren('options') optionComponents:QueryList<ToggleSwitchComponent>|null = null;
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

  constructor(public roomService: RoomService, private messageboxService:MessageboxService, private route:ActivatedRoute){

  }

  ngAfterViewInit(){
    this.messageBoxComponent = this.messageboxService.getComponent();
    
    this.setup();
  }

  async setup(){
    this.initEvents();

    this.questionsListComponent?.setQuestions(this.questions);
    this.questionsListComponent?.setAdminMode(true);

    this.options = await this.roomService.loadOptions();

    this.setupRoomConnection();
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

  async start(){
    this.roomService.sendStart();
  }

  async stop(){
    this.roomService.sendStop();
  }

  async remove(){
    if(!this.roomService._connected_id) return;

    const confirmed = await new Promise((resolve:any) => this.messageboxService.getComponent()?.confirm("Make sure", "Do you really want to delete this room?", (yes)=>{
      resolve(yes);
    }));

    if(!confirmed) return;

    const result = await this.roomService.deleteRoom(this.roomService._connected_id);

    if(!result) return;

    window.location.href = '/';
  }

  onSubmit(questions:IQuestion[]){
    this.roomService.sendNewQuestion(questions);
  }


  async setupRoomConnection(){
    const id = this.route.snapshot.queryParams?.['id'];

    const room = await this.roomService.getRoomById(id);

    if(room == null){
      return this.messageboxService.getComponent()?.show('Error', 'Room not found with id '+id, 60*60*24);
    }

    //const username = await this.messageboxService.getComponent()?.showInput('Enter username', 'username');
    const username = 'admin';

    if(!username) return;

    const connection = await this.roomService.joinRoom(room.pin);
    
    if(connection == null){
      return this.messageboxService.getComponent()?.show('Error', 'Failed to connect to the room', 60*60*24);
    }

    this.roomService.sendRequestAsAdmin(username, id);
  }
}
