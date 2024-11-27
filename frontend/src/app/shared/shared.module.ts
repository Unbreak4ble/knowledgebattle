import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomListComponent } from './components/room-list/room-list.component';
import { PlayersListComponent } from './components/players-list/players-list.component';
import { CreateRoomInputComponent } from './components/create-room-input/create-room-input.component';
import { JoinRoomInputComponent } from './components/join-room-input/join-room-input.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { QuestionComponent } from './components/question/question.component';
import { QuestionsCarouselComponent } from './components/questions-carousel/questions-carousel.component';


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
  ]
})
export class SharedModule { }
