import { Component, ViewChild } from '@angular/core';
import { RoomService } from '../../../../core/services/room/room.service';
import { SharedModule } from '../../../../shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageBoxComponent } from '../../../../shared/components/message-box/message-box.component';
import { IRoom } from '../../../../core/interfaces/room/room.interface';
import { QuestionsCarouselComponent } from '../../../../shared/components/questions-carousel/questions-carousel.component';
import { MessageboxService } from '../../../../core/services/messagebox/messagebox.service';
import { Meta, Title } from '@angular/platform-browser';

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
  next_seconds_left:number = -1;
  finish_seconds_left:number = -1;
  coutdown_interval:any = null;
  room_info:IRoom|null = null;

  constructor(private pageTitle:Title, private meta: Meta,public roomService: RoomService, private router: Router, private route:ActivatedRoute, private messageboxService: MessageboxService){
    this.setupRoomConnection();
  }

  ngAfterViewInit(){
    this.messageBoxComponent = this.messageboxService.getComponent();
    this.setupRoomEvent();
  }

  setupTags(name:string){
    this.pageTitle.setTitle("QuizRoom - "+name);
    this.meta.updateTag({name: 'title', content: "QuizRoom - "+name});
  }

  async setupRoomEvent(){
    this.roomService.subscribeRoom(async(msg)=>{
      if(msg.type != 'start') return false;

      this.messageBoxComponent?.show('Starting', 'Get ready, the game is starting');

      return true;
    });

    this.roomService.subscribeRoom(async(msg)=>{
      if(msg.type != 'request_failed') return false;

      this.messageBoxComponent?.show('Connection failed', 'Check your username', 3);

      await new Promise(resolve => setTimeout(resolve, 1000*3.5));
      
      await this.setupRoomConnection();

      return true;
    });

    this.roomService.subscribeRoom(async(msg)=>{
      if(msg.type != 'question_result') return false;

      clearInterval(this.coutdown_interval);

      if(msg.data?.next == false) {
        this.finish_seconds_left = 5;

        this.coutdown_interval = setInterval(()=> {
          --this.finish_seconds_left;

          if(this.finish_seconds_left < 0) clearInterval(this.coutdown_interval);
        }, 800);
      }else{
        this.next_seconds_left = 5;

        this.coutdown_interval = setInterval(()=> {
          --this.next_seconds_left;

          if(this.next_seconds_left < 0) clearInterval(this.coutdown_interval);
        }, 800);
      }

      return true;
    });
  }

  async setupRoomConnection(){
    const pin = this.route.snapshot.queryParams?.['pin'];

    this.pin = pin;

    const room = await this.roomService.getRoom(pin);

    if(room == null){
      this.messageboxService.getComponent()?.show('Error', 'Room not found with pin '+pin, 10);
      await new Promise(resolve => setTimeout(resolve, 10*1000));
      window.location.href = '/';
      return;
    }

    this.setupTags(room.name);

    const username = await this.messageboxService.getComponent()?.showInput('Enter username', 'username');

    if(!username) {
      this.setupRoomConnection();
      return;
    }

    this.username = username;

    const connection = await this.roomService.joinRoom(pin);
    
    if(connection == null){
      return this.messageboxService.getComponent()?.show('Error', 'Failed to connect to the room', 60*60*24);
    }

    this.roomService.sendRequest(username);
  }
}
