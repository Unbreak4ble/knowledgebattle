import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-note-bubble',
  templateUrl: './note-bubble.component.html',
  styleUrl: './note-bubble.component.scss'
})
export class NoteBubbleComponent {
  @Input('text') text:string = '';

  constructor(){

  }

  ngAfterViewInit(){
    
  }
}
