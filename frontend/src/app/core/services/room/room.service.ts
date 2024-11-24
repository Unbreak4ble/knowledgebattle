import { Injectable } from '@angular/core';
import { ICreateRoom } from '../../interfaces/room/create_room.interface';
import { IRoom } from '../../interfaces/room/room.interface';
import { IRoomConnection } from '../../interfaces/room/room_connection.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor() { }

  gotoRoom(pin:number){
    window.location.href = "/";
  }

  async getRoom(pin:number): Promise<IRoom|null> {
    return null;
  }

  async joinRoom(pin: number): Promise<IRoomConnection|null>{
    return null;
  }

  async createRoom(parameters:ICreateRoom): Promise<IRoom|null> {
    return null;
  }

  async fetchRandomRooms(max:number = 64): Promise<IRoom[]> {
    return [];
  }
}
