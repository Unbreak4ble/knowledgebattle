import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RoomService } from '../../../core/services/room/room.service';

@Component({
  selector: 'app-join-room-input',
  templateUrl: './join-room-input.component.html',
  styleUrl: './join-room-input.component.scss'
})
export class JoinRoomInputComponent {
  not_found:boolean = false;

  constructor(@Inject(DOCUMENT) private _document: Document, private roomService: RoomService){

  }

  ngAfterViewInit(){
    this.setupRules();
  }

  setupRules(){
    this.setupInputRules();
  }

  setupInputRules(){
    const element =  this._document.querySelector("input");

    element?.addEventListener('keypress', (evt) => {
      const key = evt.key;
      
      if(!/^\d+$/gim.test(key)) evt.preventDefault();
    })
  }

  async onSubmit(){
    const element = this._document.querySelector("input");

    const pin = Number(element?.value || 0);

    const room = await this.roomService.getRoom(pin);

    if(room != null) return this.roomService.gotoRoom(pin);

    this.not_found = true;
  }
}
