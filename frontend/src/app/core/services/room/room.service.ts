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
    window.location.href = "/room?pin="+pin;
  }

  gotoAdminRoom(id:string){
    window.location.href = "/room/admin?id="+id;
  }

  saveToken(id:string, token:string){
    this.storageService.set('token_'+id, token);
  }

  loadToken(id:string){
    return this.storageService.get('token_'+id);
  }

  async getRoomById(id:string): Promise<IRoom|null> {
    const payload = {
      method: 'GET',
      headers: {
        'authorization': this.loadToken(id) || ""
      }
    };

    const response = await fetch('/api/room/fetch/'+id, payload);

    if(response.status != 200) return null;

    return await response.json();
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
