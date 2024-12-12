import { Injectable } from '@angular/core';
import { ICreateRoom } from '../../interfaces/room/create_room.interface';
import { IRoom } from '../../interfaces/room/room.interface';
import { IRoomConnection } from '../../interfaces/room/room_connection.interface';
import { CreateRoomResponse } from '../../interfaces/room/create_room_response.interface';
import { StorageService } from '../storage/storage.service';
import { RoomCommands } from './commands';
import { MessageboxService } from '../messagebox/messagebox.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService extends RoomCommands {
  _ws:WebSocket|null = null;
  _connected_pin:number|null = null;
  _connected_id:string|null = null;
  user:any = null;
  private listeners:{once:boolean, finished:boolean, callback: ((msg:any)=>Promise<boolean>)}[] = [];
  private join_listeners:(()=>void)[] = [];
  live_room_data:any = {
    players: [],
    players_count: 0,
    started: false,
    start_question_timeout: 0,
  };
  connected_room:IRoom|null = null;

  constructor(private storageService: StorageService, private messageBoxService: MessageboxService) {
    super();
  }

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

  deleteToken(id:string){
    this.storageService.remove('token_'+id);
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

  async deleteRoom(id:string): Promise<boolean> {
    const payload = {
      method: 'DELETE',
      headers: {
        'authorization': this.loadToken(id) || ""
      }
    };
    const response = await fetch('/api/room/delete/'+id, payload);

    if(response.status != 200) return false;

    this.deleteToken(id);

    if(this._ws){
      this.sendKickAll();
    }

    return true;
  }

  async waitForJoin(){
    await new Promise((resolve:any) => this.join_listeners.push(resolve));
  }

  private emitJoinEvent(){
    for(const listener of this.join_listeners){
      listener();
    }
    
    this.join_listeners = [];
  }

  async joinRoom(pin: number): Promise<IRoomConnection|null>{
    const room = await this.getRoom(pin);

    if(room == null) return null;

    this.connected_room = await this.getRoomById(room.id);
    this._connected_pin = pin;
    this._connected_id = room?.id;
    this._ws = new WebSocket('/api/room/join/'+pin);

    this._ws.addEventListener('message', async (msg:any)=>{
      for(let i=0; i<this.listeners.length; i++){
        this.listeners[i].finished = await this.listeners[i].callback?.(JSON.parse(msg.data));
      }

      this.listeners = this.listeners.filter(x => !(x.once && x.finished));
    });

    const connection:IRoomConnection = {
      pin: pin,
      websocket: this._ws
    };

    this.subscribeRoom(async (msg:any)=>{
      if(msg.type != 'recognition') return false;

      this.user = msg.data;
      return true;
    }, true);

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

    if(!result){
      return this._ws = null;
    }

    await new Promise((resolve:any) => this.subscribeRoom((msg:any) => {
      if(msg.type == 'request') return resolve();
    }));

    this.emitJoinEvent();
    this.setupCommonListeners();
    this.setupCommands(this._ws);

    return result ? connection : null;
  }

  setupCommonListeners(){
    // players event
    this.subscribeRoom(async (msg) => {
      if(msg.type != 'players') return false;

      this.live_room_data.players = msg.data;
      this.live_room_data.players_count = msg.data.length;
      return true;
    });

    // start event
    this.subscribeRoom(async (msg) => {
      if(msg.type != 'start') return false;

      this.live_room_data.started = true;
      this.live_room_data.start_question_timeout = msg.data.timeout;
      return true;
    });

    // stop event
    this.subscribeRoom(async (msg) => {
      if(msg.type != 'stop') return false;

      this.live_room_data.started = false;
      return true;
    });

    // kick event
    this.subscribeRoom(async (msg) => {
      if(msg.type != 'kick') return false;

      this.live_room_data.started = false;
      this._ws = null;

      this.messageBoxService.getComponent()?.show('Ops', 'You got kicked', 60*60);

      return true;
    });

    // update pin event
    this.subscribeRoom(async (msg) => {
      if(msg.type != 'update_pin') return false;
      if(msg.data?.pin == null) return false;

      this._connected_pin = msg.data?.pin;

      if(this.connected_room)
        this.connected_room.pin = this._connected_pin || 0;

      return true;
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

  subscribeRoom(onmessage:(msg:any)=>Promise<boolean>, once:boolean=false):void{
    this.listeners.push({once: once, callback: onmessage, finished: false});
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
          id: 'ingame.visibility.result_poll',
          text: 'Result poll'
      },
      {
          id: 'privacy.public',
          text: 'Public'
      },
      {
          id: 'ingame.time.wait_for_all',
          text: 'Wait for all to finish'
      },
      {
          id: 'ingame.allow_join',
          text: 'Allow join during game'
      },
    ]
  }
}
