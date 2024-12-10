import { Component, ViewChild, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { MessageboxService } from './core/services/messagebox/messagebox.service';
import { MessageBoxComponent } from './shared/components/message-box/message-box.component';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CoreModule, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('messagebox') messageboxComponent:MessageBoxComponent|undefined;
  title = 'frontend';

  constructor(private messageboxService:MessageboxService){
    
  }

  ngAfterViewInit(){
    if(this.messageboxComponent)
      this.messageboxService.setComponent(this.messageboxComponent);
  }
}
