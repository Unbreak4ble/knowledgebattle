import { Component } from '@angular/core';
import { MessageboxService } from '../../../../core/services/messagebox/messagebox.service';
import { MessageBoxComponent } from '../../../../shared/components/message-box/message-box.component';

@Component({
  selector: 'app-room-admin',
  standalone: true,
  imports: [],
  templateUrl: './room-admin.component.html',
  styleUrl: './room-admin.component.scss'
})
export class RoomAdminComponent {
  messageBoxComponent:MessageBoxComponent|null = null;

  constructor(private messageboxService:MessageboxService){

  }

  ngAfterViewInit(){
    this.messageBoxComponent = this.messageboxService.getComponent();

    this.messageBoxComponent?.confirm("choose the truth", "truth only", result => {
      console.log('chose: ', result);
    });
  }
}
