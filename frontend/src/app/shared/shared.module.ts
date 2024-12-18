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
import { QuestionsListLiveComponent } from './components/questions-list-live/questions-list-live.component';
import { PinComponent } from './components/pin/pin.component';
import { LiveQuestionViewComponent } from './components/live-question-view/live-question-view.component';
import { RoomRankingComponent } from './components/room-ranking/room-ranking.component';
import { RankingListComponent } from './components/ranking-list/ranking-list.component';
import { NumberInputComponent } from './components/number-input/number-input.component';
import { CoutdownComponent } from './components/coutdown/coutdown.component';
import { NoteBubbleComponent } from './components/note-bubble/note-bubble.component';


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
    QuestionsListLiveComponent,
    PinComponent,
    LiveQuestionViewComponent,
    RoomRankingComponent,
    RankingListComponent,
    NumberInputComponent,
    CoutdownComponent,
    NoteBubbleComponent,
  ],
  // to be used along imports
  exports: [
    NoteBubbleComponent,
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
    QuestionsListLiveComponent,
    PinComponent,
    RoomRankingComponent,
    LiveQuestionViewComponent,
    RankingListComponent,
    NumberInputComponent,
    CoutdownComponent,
  ]
})
export class SharedModule { }
