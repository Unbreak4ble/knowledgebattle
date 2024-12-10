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
  room_info:IRoom|null = null;

  constructor(private roomService: RoomService, private router: Router, private route:ActivatedRoute, private messageboxService: MessageboxService){
    this.setupRoomConnection();
  }

  ngAfterViewInit(){
    this.messageBoxComponent = this.messageboxService.getComponent();
    //this.messageBoxComponent?.show("pin code", "room not found");
    /*
    this.messageBoxComponent?.confirm("choose the truth", "truth only", result => {
      console.log('chose: ', result);
    });*/
  }

  setupRoomConnection(){
    const pin = this.route.snapshot.queryParams?.['pin'];

    this.pin = pin;

    
  }
}
