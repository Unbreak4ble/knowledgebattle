import { Component, EventEmitter, Input, Output, input } from '@angular/core';

@Component({
  selector: 'app-pin-input',
  templateUrl: './pin-input.component.html',
  styleUrl: './pin-input.component.scss'
})
export class PinInputComponent {
  @Input('inputs') inputs_count:number = 2;
  @Input('chars') max_input_length:number = 3;
  inputs: number[] = [];
  @Output('value') onvalue: EventEmitter<any> =  new EventEmitter();
  @Output('fill') onfill: EventEmitter<any> =  new EventEmitter();

  constructor(){

  }

  ngOnInit(){
    this.inputs = new Array(this.inputs_count).fill(0).map((x,i) => i);
  }

  ngAfterViewInit(){
    this.setupEvents();
  }

  get value():number {
    const inputs_id:string[] = this.inputs.map(x => 'pin-input-'+x);
    let value = '';

    inputs_id.forEach(input_id => {
      const element:any = document.getElementById(input_id);
      value += element?.value || '';
    });

    return Number(value || 0) as number;
  }

  setupEvents(){
    const inputs_id:string[] = this.inputs.map(x => 'pin-input-'+x);
    const inputs_length = inputs_id.length-1;

    inputs_id.forEach(((input_id:any, index:number) => {
      const element:any = document.getElementById(input_id);
      const value = element.value;

      element.setAttribute('maxlength', this.max_input_length);

      setInterval(() => {
        if(document.activeElement == element)
          element.selectionStart = element.selectionEnd = element.value.length
      }, 100);

      if(element == null) return;

      element.addEventListener('focus', ((evt:any) => {
        inputs_id.forEach(((ahead_input_id:any, ahead_index:number) => {
          const ahead_element:any = document.getElementById(ahead_input_id);

          if(ahead_index < index){
            if(ahead_element?.value.length < this.max_input_length){
              ahead_element?.focus();
            }
          }else{
            if(ahead_element?.value.length > 0){
              ahead_element?.focus();
            }
          }
        }).bind(this));
      }).bind(this));

      element.addEventListener('keyup', (evt:any) => {
        element.value = (element.value.match(/\d+/gim) || []).join('').slice(0, this.max_input_length);
      });
      
      element.addEventListener('keydown', (evt:any) => {
        let length = element.value.length;
        const value = element.value + evt.key;

        if(!(evt.keyCode >= 0x30 && evt.keyCode <= 0x39 || evt.keyCode == 0x8)){
          return evt.preventDefault();
        }

        if(evt.key.length == 1){
          if(/^\d+$/gim.test(evt.key)){
            length+=1;
          }

          if(length >= this.max_input_length && index == inputs_length){
            this.onfill.emit(value);
          }
        }

        if(length >= this.max_input_length){
          if(index < inputs_length){
            const next_element:any = document.getElementById(inputs_id[index+1]);

            next_element.focus();
          }
        }else if(length == 0 && index > 0){
          document.getElementById(inputs_id[index-1])?.focus();
        }

        this.onvalue.emit(value);
      });
    }).bind(this));
  }
}