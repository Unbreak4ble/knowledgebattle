import { Component, ViewChild } from '@angular/core';
import { RoomService } from '../../../../core/services/room/room.service';
import { SharedModule } from '../../../../shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageBoxComponent } from '../../../../shared/components/message-box/message-box.component';
import { IRoom } from '../../../../core/interfaces/room/room.interface';
import { QuestionsCarouselComponent } from '../../../../shared/components/questions-carousel/questions-carousel.component';
import { MessageboxService } from '../../../../core/services/messagebox/messagebox.service';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent {
  messageBoxComponent:MessageBoxComponent|null = null;
  @ViewChild("questions_carousel") questionsCarouselComponent:QuestionsCarouselComponent|null = null;
  pin:number|null = null;
  username:string = '';
  room_info:IRoom|null = null;

  constructor(public roomService: RoomService, private router: Router, private route:ActivatedRoute, private messageboxService: MessageboxService){
    this.setupRoomConnection();
  }

  ngAfterViewInit(){
    this.messageBoxComponent = this.messageboxService.getComponent();
    this.setupRoomEvent();
  }

  async setupRoomEvent(){
    this.roomService.subscribeRoom(async(msg)=>{
      if(msg.type != 'start') return false;

      this.messageBoxComponent?.show('Starting', 'Get ready, the game is starting', msg.data?.timeout);

      return true;
    });
  }

  async setupRoomConnection(){
    const pin = this.route.snapshot.queryParams?.['pin'];

    this.pin = pin;

    const room = await this.roomService.getRoom(pin);

    if(room == null){
      return this.messageboxService.getComponent()?.show('Error', 'Room not found with pin '+pin, 60*60*24);
    }

    const username = await this.messageboxService.getComponent()?.showInput('Enter username', 'username');

    if(!username) return;

    this.username = username;

    const connection = await this.roomService.joinRoom(pin);
    
    if(connection == null){
      return this.messageboxService.getComponent()?.show('Error', 'Failed to connect to the room', 60*60*24);
    }

    this.roomService.sendRequest(username);
    
    this.messageboxService.getComponent()?.show('Success', 'Connected to the room');
  }
}
