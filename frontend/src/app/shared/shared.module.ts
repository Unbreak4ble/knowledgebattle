import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomListComponent } from './components/room-list/room-list.component';
import { PlayersListComponent } from './components/players-list/players-list.component';
import { CreateRoomInputComponent } from './components/create-room-input/create-room-input.component';
import { JoinRoomInputComponent } from './components/join-room-input/join-room-input.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { QuestionComponent } from './components/question/question.component';
import { QuestionsCarouselComponent } from './components/questions-carousel/questions-carousel.component';
import { PlayersCountComponent } from './components/players-count/players-count.component';
import { QuestionsStepformComponent } from './components/questions-stepform/questions-stepform.component';
import { MakeQuestionComponent } from './components/make-question/make-question.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { QuestionsListComponent } from './components/questions-list/questions-list.component';
import { ToggleSwitchComponent } from './components/toggle-switch/toggle-switch.component';
import { PinInputComponent } from './components/pin-input/pin-input.component';


@NgModule({
  // to use along declarations
  imports: [
    CommonModule
  ],
  declarations: [
    RoomListComponent,
    PlayersListComponent,
    CreateRoomInputComponent,
    JoinRoomInputComponent,
    MessageBoxComponent,
    QuestionComponent,
    QuestionsCarouselComponent,
    QuestionsListComponent,
    PlayersCountComponent,
    QuestionsStepformComponent,
    MakeQuestionComponent,
    TextareaComponent,
    ToggleSwitchComponent,
    PinInputComponent,
  ],
  // to be used along imports
  exports: [
    RoomListComponent,
    PlayersListComponent,
    CreateRoomInputComponent,
    JoinRoomInputComponent,
    MessageBoxComponent,
    QuestionComponent,
    QuestionsCarouselComponent,
    PlayersCountComponent,
    QuestionsListComponent,
    QuestionsStepformComponent,
    MakeQuestionComponent,
    TextareaComponent,
    ToggleSwitchComponent,
    PinInputComponent,
  ]
})
export class SharedModule { }
