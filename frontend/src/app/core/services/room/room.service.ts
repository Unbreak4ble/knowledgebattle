import { Injectable } from '@angular/core';
import { ICreateRoom } from '../../interfaces/room/create_room.interface';
import { IRoom } from '../../interfaces/room/room.interface';
import { IRoomConnection } from '../../interfaces/room/room_connection.interface';
import { CreateRoomResponse } from '../../interfaces/room/create_room_response.interface';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private storageService: StorageService) { }

  gotoRoom(pin:number){
    window.location.href = "/";
  }

  saveToken(pin:number, token:string){
    this.storageService.set('token_'+pin, token);
  }

  loadToken(pin:number){
    return this.storageService.get('token_'+pin);
  }

  async getRoom(pin:number): Promise<IRoom|null> {
    return null;
  }

  async joinRoom(pin: number): Promise<IRoomConnection|null>{
    return null;
  }

  async createRoom(parameters:ICreateRoom): Promise<CreateRoomResponse|null> {
    const payload = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(parameters)
    };

    const response = await fetch('/api/room/create', payload);

    if(response.status != 200) return null;

    return await response.json();
  }

  async fetchRandomRooms(max:number = 64): Promise<IRoom[]> {
    const response = await fetch('/api/room/list');

    if(response.status != 200) return [];

    return await response.json();
  }
}
