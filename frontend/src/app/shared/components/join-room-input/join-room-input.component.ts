import { Component, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RoomService } from '../../../core/services/room/room.service';
import { PinInputComponent } from '../pin-input/pin-input.component';

@Component({
  selector: 'app-join-room-input',
  templateUrl: './join-room-input.component.html',
  styleUrl: './join-room-input.component.scss'
})
export class JoinRoomInputComponent {
  @ViewChild('pin_input') pinInputComponent: PinInputComponent|undefined;
  not_found:boolean = false;

  constructor(@Inject(DOCUMENT) private _document: Document, private roomService: RoomService){

  }

  ngAfterViewInit(){

  }

  async onSubmit(){
    const pin = this.pinInputComponent?.value || 0;

    const room = await this.roomService.getRoom(pin);

    if(room != null) return this.roomService.gotoRoom(pin);

    this.not_found = true;
  }
}
