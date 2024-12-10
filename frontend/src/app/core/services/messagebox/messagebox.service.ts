import { Injectable } from '@angular/core';
import { MessageBoxComponent } from '../../../shared/components/message-box/message-box.component';

@Injectable({
  providedIn: 'root'
})
export class MessageboxService {
  private component:MessageBoxComponent|null = null;

  constructor() {

  }

  setComponent(component:MessageBoxComponent){
    this.component = component;
  }

  getComponent(){
    return this.component;
  }
}
