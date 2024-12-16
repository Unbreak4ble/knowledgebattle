import { Component, Input } from '@angular/core';
import { v4 } from 'uuid';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrl: './number-input.component.scss'
})
export class NumberInputComponent {
  readonly _uuid = v4();
  value:number = 0;
  @Input('text') text:string = '';
  @Input('min') minimum:number|null = null;
  @Input('max') maximum:number|null = null;
  @Input('positive') positive_only:boolean = false;
  _document:Element|null = null;

  constructor(){

  }

  ngAfterViewInit(){
    this._document = document.getElementById('id_'+this._uuid);

    this.setupEvents();
  }

  setNumber(number:number){
    const input:any = this._document?.querySelector('.number-input-input');
    const text_element:any = this._document?.querySelector('.number-input-text');

    if(input == null || text_element == null) return;

    input.value = this.value = Math.min(this.maximum||number, Math.max(this.minimum || 0, number));
    text_element.innerHTML = input.value;
  }

  setupEvents(){
    const input:any = this._document?.querySelector('.number-input-input');
    const text_element:any = this._document?.querySelector('.number-input-text');
    
    if(input == null || text_element == null) return;

    if(this.value == 0){
      input.value = this.value = this.minimum || 0;
      text_element.innerHTML = input.value;
    }
    

    input.addEventListener('keyup', (evt:any) => {
      const real_value = input.value;
      const number_value = +real_value;

      input.value = (input.value.match(/(^\-)?\d+/gim) || []).join('');

      if(this.maximum != null && number_value >= this.maximum) input.value = ''+(this.maximum || 0);
      if(this.positive_only && number_value <= 0) input.value = '0';
      if(this.minimum && number_value <= this.minimum) input.value = ''+(this.minimum || 0);

      this.value = +input.value;
      text_element.innerHTML = input.value;
    });

    input.addEventListener('keydown', (evt:any)=>{
      const value = input.value + evt.key;
      const real_value = input.value;
      const number_value = +real_value;

      switch(evt.keyCode){
        case 0x26:
          if(this.maximum != null && number_value >= this.maximum) return input.value = ''+(this.maximum || 0);

          input.value = number_value+1;
        break;
        case 0x28:
          if(this.minimum && number_value <= this.minimum) return input.value = ''+(this.minimum || 0);
          if(this.positive_only && number_value <= 0) return input.value = '0';

          input.value = number_value-1;
        break;
        case 0x27:
        case 0x25:
        case 0xbd:
          return;
        break;
      }

      if((
        (evt.keyCode >= 0x30 && evt.keyCode <= 0x39) ||
        (evt.keyCode == 0x8)) && (
        (this.maximum != null && number_value > this.maximum) ||
        (this.minimum && number_value < this.minimum) ||
        (this.positive_only && number_value < 0)
      )){
        evt.preventDefault();
        return
      }

      if(!(evt.keyCode >= 0x30 && evt.keyCode <= 0x39 || evt.keyCode == 0x8)){
        return evt.preventDefault();
      }

      if(evt.key.length == 1)
        text_element.innerHTML = value;
    });
  }
}
