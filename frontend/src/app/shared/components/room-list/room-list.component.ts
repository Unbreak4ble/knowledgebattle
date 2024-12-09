import { Component } from '@angular/core';
import { fake_rooms } from './room-list.header';
import { RoomService } from '../../../core/services/room/room.service';
import { IRoom } from '../../../core/interfaces/room/room.interface';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss'
})
export class RoomListComponent {
  random_rooms:IRoom[] = [];

  constructor(private roomService: RoomService){
    this.fetchRooms();
  }

  async fetchRooms(){
    this.random_rooms = await this.roomService.fetchRandomRooms();
  }

  join(pin:number){
    this.roomService.gotoRoom(pin);
  }
}
