import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomAdminComponent } from './room-admin.component';

const routes: Routes = [
  {path: '', component: RoomAdminComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomAdminRoutingModule { }
