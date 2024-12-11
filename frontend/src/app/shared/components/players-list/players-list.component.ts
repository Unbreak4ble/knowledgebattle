import { Component } from '@angular/core';
import { RoomService } from '../../../core/services/room/room.service';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrl: './players-list.component.scss'
})
export class PlayersListComponent {
  players:any[] = [];

  constructor(public roomService: RoomService){

  }
}
