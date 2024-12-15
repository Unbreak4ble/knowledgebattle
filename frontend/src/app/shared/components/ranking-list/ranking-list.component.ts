import { Component } from '@angular/core';
import { RoomService } from '../../../core/services/room/room.service';
import { toRankingList } from '../../../core/helpers/room/ranking.helper';

@Component({
  selector: 'app-ranking-list',
  templateUrl: './ranking-list.component.html',
  styleUrl: './ranking-list.component.scss'
})
export class RankingListComponent {
  result:any[] = [];

  constructor(private roomService: RoomService){
    this.setup();
  }

  ngAfterViewInit(){

  }

  async setup(){
    const response = await this.roomService.listQuestionResult();
    const correct_questions = this.roomService.live_room_data?.questions_result || [];

    this.result = toRankingList(response, correct_questions);
  }
}
