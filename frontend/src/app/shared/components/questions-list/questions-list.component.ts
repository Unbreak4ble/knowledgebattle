import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { IQuestion } from '../../../core/interfaces/question/question.interface';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { MessageboxService } from '../../../core/services/messagebox/messagebox.service';
import { RoomService } from '../../../core/services/room/room.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrl: './questions-list.component.scss'
})
export class QuestionsListComponent {
  messageBoxComponent:MessageBoxComponent|null = null;
  questions: IQuestion[] = [];
  admin_mode:boolean = false;
  @Output('submit') onSubmit: EventEmitter<IQuestion[]> = new EventEmitter();
  _createQuestion: (() => void)|undefined;
  _viewQuestion: ((question: IQuestion) => void)|undefined;
  _deleteQuestion: ((index:number) => void)|undefined;

  constructor(private changeDetectRf: ChangeDetectorRef, private messageboxService:MessageboxService, private roomService: RoomService){

  }

  ngAfterViewInit(){
    this.messageBoxComponent = this.messageboxService.getComponent();
  }

  onCreateQuestion = (callback: () => void) => this._createQuestion = callback;
  onViewQuestion = (callback:(question:IQuestion)=>void) => this._viewQuestion = callback;
  onDeleteQuestion = (callback: (index:number)=>void) => this._deleteQuestion = callback;

  fixIds(){
    this.questions = this.questions.map((q,i) => {q.id = i+1; return q});
  }

  createQuestion(){
    this._createQuestion?.();

    this.questions.push({
      id: this.questions.length+1,
      text: "untitled",
      alternatives: [],
      finished: false
    });
  }

  submitQuestions(){
    this.onSubmit.emit(this.questions);
    const questions_backup = [...this.questions];
    this.roomService.subscribeRoom(async (msg:any)=>{
      if(!(msg.type == 'request_failed' && msg.data.type == 'new_question')) return false;
      
      this.questions = questions_backup;

      this.messageBoxComponent?.show('Operation failed', msg.data.message || "unknown error");
      
      this.changeDetectRf.detectChanges();

      return true;
    }, true);

    this.questions = [];
  }

  viewQuestion(question: IQuestion){
    this._viewQuestion?.(question);
  }

  async deleteQuestion(index:number){

    const result = await new Promise(resolve => this.messageBoxComponent?.confirm("", "Do you really want to delete #"+(index+1)+" question ?", resolve));

    if(!result) return;

    this._deleteQuestion?.(index);

    this.questions[index].id = -1;
    this.questions.splice(index, 1);
    this.fixIds();
    this.changeDetectRf.detectChanges();
  }

  setQuestions(questions:IQuestion[]){
    this.questions = questions;
    this.changeDetectRf.detectChanges();
  }

  setAdminMode(enable:boolean){
    this.admin_mode = enable;
    this.changeDetectRf.detectChanges();
  }
}
