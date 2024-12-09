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
  owned_rooms:IRoom[] = [];
  owned_rooms_ids:string[] = [];

  constructor(private roomService: RoomService){
    this.owned_rooms_ids = roomService.getOwnedRoomsIds();
    this.fetchRooms();
    this.fetchOwnedRooms();
  }

  async fetchRooms(){
    this.random_rooms = await this.roomService.fetchRandomRooms();
  }

  async fetchOwnedRooms(){
    this.owned_rooms_ids.forEach(async id => {
      const room = await this.roomService.getRoomById(id);

      if(room)
        this.owned_rooms.push(room);
    });
  }

  manageRoom(id:string){
    this.roomService.gotoAdminRoom(id);
  }

  join(pin:number){
    this.roomService.gotoRoom(pin);
  }
}
