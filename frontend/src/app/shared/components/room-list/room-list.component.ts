import { Component } from '@angular/core';
import { fake_rooms } from './room-list.header';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss'
})
export class RoomListComponent {
  random_rooms = fake_rooms;

}
