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
  _ws:WebSocket|null = null;
  _connected_pin:number|null = null;
  listeners:((msg:any)=>void)[] = [];
  live_room_data:any = {};

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
    const response = await fetch('/api/room/fetch/pin/'+pin);

    if(response.status != 200) return null;

    return await response.json();
  }

  async joinRoom(pin: number): Promise<IRoomConnection|null>{
    this._connected_pin = pin;
    this._ws = new WebSocket('/api/room/join/'+pin);

    this._ws.addEventListener('message', (msg:any)=>{
      this.listeners.forEach(listener => listener?.(JSON.parse(msg.data)));
    });

    const connection:IRoomConnection = {
      pin: pin,
      websocket: this._ws
    };

    const result = await new Promise(((resolve:any) => {
      this._ws?.addEventListener('open', ()=>{
        resolve(true);
      });
      this._ws?.addEventListener('close', ()=>{
        resolve(false);
      });
      this._ws?.addEventListener('error', ()=>{
        resolve(false);
      });
    }).bind(this));

    await new Promise((resolve:any) => this.subscribeRoom((msg:any) => {
      if(msg.type == 'request') return resolve();
    }));

    this.setupCommonListeners();

    return result ? connection : null;
  }

  setupCommonListeners(){
    this.subscribeRoom((msg) => {
      if(msg.type != 'players') return;

      this.live_room_data.players = msg.data;
      this.live_room_data.players_count = msg.data.length;
    });
  }

  sendRoom(data:any){
    try{
      this._ws?.send(JSON.stringify(data));
    }catch{
      this._ws?.send(data);
    }
  }

  sendRequest(username:string){
    this.sendRoom({name: username, token: null});
  }

  sendRequestAsAdmin(username:string, id:string){
    const token = this.loadToken(id);
    this.sendRoom({name: username, token: token});
  }

  subscribeRoom(onmessage:(msg:any)=>void):void{
    this.listeners.push(onmessage);
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

  getOwnedRoomsIds():string[] {
    const ids = this.storageService.listKeys().filter(x => x.includes('token_')).map(x => x.replace('token_', ''));

    return ids;
  }

  async loadOptions(): Promise<any[]> {
    return [
      {
          id: 'visibility.result_poll',
          text: 'Result poll'
      },
      {
          id: 'privacy.public',
          text: 'Public'
      },
      {
          id: 'time.wait_for_all',
          text: 'Wait for all'
      },
    ]
  }
}
