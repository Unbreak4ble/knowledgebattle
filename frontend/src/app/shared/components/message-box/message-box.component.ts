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
  prompt_mode:boolean = false;
  input_mode:boolean = false;
  prompt_callback:((result:any)=>void)|null = null;
  submitInput:()=>void = ()=>{};
  _document:Document = new Document();

  constructor(
    //@Inject(DOCUMENT) private _document: Document, 
    private cdRef: ChangeDetectorRef){
      
  }

  ngOnInit(){
    this._document = document;
  }

  private displayModal(){
    const element:any = this._document.querySelector('.message-box');
    const element_content:any = this._document.querySelector('.message-box-content');

    if(!(element && element_content)) return;

    element.style['display'] = "flex";
    element_content.classList.add('message-box-content-show');
  }

  private hideModal(){
    const element:any = this._document.querySelector('.message-box');
    const element_content:any = this._document.querySelector('.message-box-content');

    if(!(element && element_content)) return;

    element.style['display'] = "none";
    element_content.classList.remove('message-box-content-show');
  }

  private async startProgressBar(){
    await new Promise(resolve => setTimeout(resolve, 10));
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
    this.input_mode = false;
    this.prompt_mode = false;
    this.prompt_callback = null;
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

  confirm(title:string, message:string, callback: (result:any) => void){
    const timeout_seconds=60*60*24;
    this.prompt_callback = callback;
    this.prompt_mode = true;
    this.input_mode = false;
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

  async showInput(title:string, plaeholder:string):Promise<string|null> {
    this.input_mode = true;
    this.prompt_mode = false;
    this.title = title;

    this.displayModal();
    this.cdRef.detectChanges();

    await new Promise(((resolve:any) => this.submitInput = () => resolve()).bind(this));

    const element:any = document.querySelector('.message-box-input');

    if(element == null) return null;

    const value = element.value;

    element.value = '';

    this.hide();

    return value;
  }

  selectPrompt(yes:boolean){
    this.prompt_callback?.(yes);
    this.hide();
  }

  hide(){
    this.hideModal();
  }
}