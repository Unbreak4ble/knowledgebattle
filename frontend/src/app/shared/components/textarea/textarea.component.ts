import { DOCUMENT } from '@angular/common';
import * as uuid from 'uuid';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss'
})
export class TextareaComponent {
  readonly uuid:string = 'id_'+uuid.v4();
  @Input('placeholder') placeholder:string = '';
  @Input('text') text:string = '';
  @Input('id') id:string|null = null;
  @Input('font-size') font_size:string = '20px';
  @Output('onvalue') onchange: EventEmitter<any> = new EventEmitter<any>;
  _document:Element|null = null;

  constructor(){

  }

  ngAfterViewInit(){
    this._document = document.querySelector('#'+this.uuid);
    this.setupEvents();
  }

  setupEvents(){
    const element = this._document?.querySelector('textarea');
    
    element?.addEventListener('input', (() => {
      this.text = element.value + '\n';
      this.onchange?.emit({id: this.id, value: this.text});
    }).bind(this));
  }

  lock(){
    const textarea = this._document?.querySelector('textarea');
    const p = this._document?.querySelector('p');
    if(!(p && textarea)) return;

    p.style.visibility = 'visible';
    textarea.style.display = 'none';
  }

  unlock(){
    const textarea = this._document?.querySelector('textarea');
    const p = this._document?.querySelector('p');
    if(!(p && textarea)) return;

    p.style.visibility = 'hidden';
    textarea.style.display = 'block';
  }

  reset_input(){
    const textarea = this._document?.querySelector('textarea');
    if(!textarea) return;
    
    this.text = '';
    textarea.value = '';
    textarea.innerHTML = '';
  }
}
