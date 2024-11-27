import { Component, ViewChild } from '@angular/core';
import { RoomService } from '../../../../core/services/room/room.service';
import { SharedModule } from '../../../../shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageBoxComponent } from '../../../../shared/components/message-box/message-box.component';
import { IRoom } from '../../../../core/interfaces/room/room.interface';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent {
  @ViewChild("messagebox") messageBoxComponent:MessageBoxComponent|null = null;
  pin:number|null = null;
  room_info:IRoom|null = null;

  constructor(private roomService: RoomService, private router: Router, private route:ActivatedRoute){
    this.setupRoomConnection();
  }

  ngAfterViewInit(){
    //this.messageBoxComponent?.show("pin code", "room not found");
  }

  setupRoomConnection(){
    const pin = this.route.snapshot.queryParams?.['pin'];

    this.pin = pin;

    
  }
}
