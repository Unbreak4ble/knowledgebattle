import { Component } from '@angular/core';
import { RoomService } from '../../../core/services/room/room.service';
import { toRankingList } from '../../../core/helpers/room/ranking.helper';

@Component({
  selector: 'app-room-ranking',
  templateUrl: './room-ranking.component.html',
  styleUrl: './room-ranking.component.scss'
})
export class RoomRankingComponent {
  result:any[] = [];
  background:string[] = [
    "#ffe249",
    "#ffa755",
    "#d1d1d1"
  ];

  constructor(private roomService:RoomService){
    this.setup();
  }

  ngAfterViewInit(){

  }

  async setup(){
    const response = await this.roomService.listQuestionResult();
    const correct_questions = this.roomService.live_room_data?.questions_result || [];

    this.result = toRankingList(response, correct_questions).slice(0, 3);
  }

}
