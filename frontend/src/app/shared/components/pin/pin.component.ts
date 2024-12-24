import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard'
import { RoomService } from '../../../core/services/room/room.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrl: './pin.component.scss'
})
export class PinComponent {
  @Input('live') live:boolean = false;
  @Input('gen_button') gen_button:boolean = false;
  @Input('copy_button') copy_button:boolean = false;
  @Output('generate') ongenerate:EventEmitter<any> = new EventEmitter();
  @Input('pin') pin:number|null = null;
  @Input('font-size') font_size:number = 20;
  @Input('delimiter') delimiter:number = 3;
  pin_codes:string[] = [];

  constructor(private roomService:RoomService, private clipboard: Clipboard){}

  ngOnInit(){
    this.setupLive();
    this.setupPinCode();
  }

  setupPinCode(){
    if(!this.pin) return;

    this.pin_codes = [];
    
    const str_pin = this.pin.toString();

    for(let i=0, j=0; i<=str_pin.length; i++){
      if((i)%this.delimiter == 0){
        const sliced = str_pin.slice(i-this.delimiter, i);

        if(sliced.length)
          this.pin_codes.push(sliced);

        ++j;
      }
    }
  }

  onNew(){
    this.ongenerate.emit();
  }

  onCopy(){
    this.clipboard.copy(this.pin_codes.join(' '));
  }

  async setupLive(){
    if(!this.live) return;

    this.pin = this.roomService._connected_pin;

    this.roomService.subscribeRoom(async (msg:any) => {
      if(msg.type != 'update_pin') return false;

        this.pin = msg.data?.pin;
        this.setupPinCode();

      return true;
    });
  }
}
