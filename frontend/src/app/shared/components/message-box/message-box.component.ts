import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrl: './message-box.component.scss'
})
export class MessageBoxComponent {
  readonly average_read: number = 100; // average miliseconds per character
  title:string = "";
  message:string = "";
  timeout_seconds:number = 3;
  _interval:any = null;
  _document = document;

  constructor(
    //@Inject(DOCUMENT) private _document: Document, 
    private cdRef: ChangeDetectorRef){
      
  }

  private displayModal(){
    const element:any = this._document.querySelector('.message-box');

    if(!element) return;

    element.style['display'] = "flex";
  }

  private hideModal(){
    const element:any = this._document.querySelector('.message-box');

    if(!element) return;

    element.style['display'] = "none";
  }

  private startProgressBar(){
    const element:any = this._document.querySelector('.message-box-progress-bar');

    if(!element) return;

    const interval = 50;
    const target_ms = this.timeout_seconds*1000/interval;
    let elapsed_ms = 0;

    clearInterval(this._interval);

    this._interval = setInterval((async () => {

      let percent = elapsed_ms/target_ms * 100;

      element.style['width'] = (percent)+"%";
      ++elapsed_ms;

      if(elapsed_ms > target_ms) {
        clearInterval(this._interval);
        await new Promise(resolve => setTimeout(resolve, 200));
        this.hideModal();
      }
    }).bind(this), interval);
  }

  show(title:string, message:string, timeout_seconds:number=0){
    this.title = title;
    this.message = message;
    if(timeout_seconds > 0){
      this.timeout_seconds = timeout_seconds;
    }else{
      this.timeout_seconds = message.length*this.average_read/1000;
    }

    this.startProgressBar();
    this.displayModal();

    this.cdRef.detectChanges();
  }

  hide(){
    this.hideModal();
  }
}