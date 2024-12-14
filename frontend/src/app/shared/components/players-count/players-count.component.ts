import { Component, Input } from '@angular/core';
import { RoomService } from '../../../core/services/room/room.service';

@Component({
  selector: 'app-players-count',
  templateUrl: './players-count.component.html',
  styleUrl: './players-count.component.scss'
})
export class PlayersCountComponent {
  @Input('live') live_mode:boolean = true;
  @Input('count') count:number = 0;

  constructor(public roomService: RoomService){

  }
}
