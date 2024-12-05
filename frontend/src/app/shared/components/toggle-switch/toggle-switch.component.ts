import { Component, Input } from '@angular/core';
import * as uuid from 'uuid';

@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.scss'
})
export class ToggleSwitchComponent {
  readonly uuid:string = 'id_'+uuid.v4();
  @Input('text') text:string = '';
  _document:Element|null = null;
  checked:boolean = false;

  constructor(){

  }

  ngAfterViewInit(){
    this._document = document.getElementById(this.uuid);
  }

  toggle(){
    const element = this._document?.querySelector('input');

    if(element == null) return;

    element.checked = this.checked = !element.checked;
  }
}
