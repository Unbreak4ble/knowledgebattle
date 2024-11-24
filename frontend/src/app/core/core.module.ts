import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomService } from './services/room/room.service';



@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    RoomService
  ]
})
export class CoreModule { }
