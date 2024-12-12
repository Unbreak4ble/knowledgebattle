import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrl: './pin.component.scss'
})
export class PinComponent {
  @Input('pin') pin:number|null = null;
  @Input('font-size') font_size:number = 20;
  @Input('delimiter') delimiter:number = 3;
  pin_codes:string[] = [];

  constructor(){}

  ngOnInit(){
    this.setupPinCode();
  }

  setupPinCode(){
    if(!this.pin) return;
    const str_pin = this.pin.toString();
    for(let i=0, j=0; i<=str_pin.length; i++){
      if((i)%this.delimiter == 0){
        const sliced = str_pin.slice(i-this.delimiter, i);

        if(sliced.length)
          this.pin_codes.push(sliced);

        ++j;
      }
    }
  }
}
