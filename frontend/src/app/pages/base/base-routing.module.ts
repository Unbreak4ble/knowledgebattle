import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(x => x.HomeModule) },
  { path: 'room', loadChildren: () => import('./pages/room/room.module').then(x => x.RoomModule) },
  { path: 'room/create', loadChildren: () => import('./pages/create-room/create-room.module').then(x => x.CreateRoomModule) },
  { path: 'room/admin', loadChildren: () => import('./pages/room-admin/room-admin.module').then(x => x.RoomAdminModule) },
  { path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
