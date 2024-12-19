import { ChangeDetectorRef, Component, Input, ɵɵsanitizeUrlOrResourceUrl } from '@angular/core';
import { setgroups } from 'process';
import { v4 } from 'uuid';
import { parseTime, times_formats } from '../../../core/utils/time_parser';

@Component({
  selector: 'app-countdown',
  templateUrl: './coutdown.component.html',
  styleUrl: './coutdown.component.scss'
})
export class CoutdownComponent {
  readonly uuid = v4();
  @Input('size') size:number = 50;
  @Input('font-size') font_size:number = 15;
  @Input('time-from') timestamp_from:number = 0;
  @Input('time-to') timestamp_to:number = 0;
  @Input('note') note:string = '';
  seconds:number = 0;
  seconds_now:number = 0;
  parsed_time_left:string = '';
  _document:Element|null = null;
  interval:any = null;

  constructor(private changeDf:ChangeDetectorRef){

  }

  ngAfterViewInit(){
    this._document = document.getElementById('id_'+this.uuid);

    this.setup();
    this.startCountdown();
  }

  setup(){
    const element:any = this._document?.querySelector('.countdown-circle svg');

    if(element == null) return;

    this.seconds = this.timestamp_to - this.timestamp_from;

    const now = Math.floor(Date.now()/1000);
    this.seconds_now = this.timestamp_to - now;
    const current_percent = Math.floor((this.seconds - this.seconds_now)/this.seconds*100);

    element.style.setProperty('--progress', ''+current_percent);

    this.changeDf.detectChanges();

    const times_format_reverse = times_formats.reverse();

    const updateText = () => {
      const now = Math.floor(Date.now()/1000);
      this.seconds_now = this.timestamp_to - now;
      const times = parseTime(this.seconds_now).reverse();
      for(let i=0; i<times.length; i++){
        const x = times[i];
        if(x > 0){
          this.parsed_time_left = x+times_format_reverse[i];
          break;
        }
      }
    };
    
    updateText();

    setInterval(updateText,1000);
  }

  startCountdown(){
    clearInterval(this.interval);

    const element:any = this._document?.querySelector('.countdown-circle svg');

    if(element == null) return;

    const time = this.seconds/100*1000;

    this.interval = setInterval(()=>{
      const value = element.style.getPropertyValue('--progress');
      element.style.setProperty('--progress', +value+1);
      if(+value+1 >= 100) clearInterval(this.interval);
    }, time);

    this.changeDf.detectChanges();
  }
}
