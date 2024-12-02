import { Component } from '@angular/core';
import { IQuestion } from '../../../../core/interfaces/question/question.interface';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.scss'
})
export class CreateRoomComponent {
  questions: IQuestion[] = [
    {
      id: 123,
      text: "hello",
      alternatives: []
    },{
      id: 123,
      text: "hello",
      alternatives: []
    }
  ];

  constructor(){

  }

  createQuestion(){

  }

  deleteQuestion(){

  }
}
