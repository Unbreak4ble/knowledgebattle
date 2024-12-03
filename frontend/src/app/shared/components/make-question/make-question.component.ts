import { Component } from '@angular/core';
import { IAlternative } from '../../../core/interfaces/question/alternative.interface';
import { IQuestion } from '../../../core/interfaces/question/question.interface';

@Component({
  selector: 'app-make-question',
  templateUrl: './make-question.component.html',
  styleUrl: './make-question.component.scss'
})
export class MakeQuestionComponent {
  id: Number = 0;
  alternatives: IAlternative[] = [];
  onchange: ((data:any) => void)|null =  null;
  question:IQuestion|null = null;

  constructor(){

  }

  ngAfterViewInit(){
    this.setup();
  }

  setup(){
    this.setupEvents();
  }

  setupEvents(){
    this.handleTextAreaEvents();
  }

  async setQuestion(question:IQuestion){
    this.question = null; // reset DOM
    await new Promise(resolve => setTimeout(resolve, 10));
    this.question = question;
    this.alternatives = question.alternatives;
    this.id = question.id;
    await new Promise(resolve => setTimeout(resolve, 10));
    this.setText(question.text);
    this.setupEvents();
  }

  async handleAlternativeTextareaChange(element_id:string){
    const element:any = document.getElementById(element_id);

    element.style['height'] = 'auto';
    element.style['height'] = (element.scrollHeight) + 'px';

    const id = Number(element_id.match(/\-([0-9]+)/gim)?.[0].replaceAll('-', '') || 0);

    await new Promise(resolve => setTimeout(resolve, 1));
    
    if(this.question?.alternatives[id])
      (this.question?.alternatives)[id].text = element.value;
  }

  handleTextAreaEvents(reset:boolean = false){
    const elements:any = document.getElementsByClassName('make-question-textarea');
    [...elements].forEach(element => {
      element.addEventListener('input', () => {
        element.style['height'] = 'auto';
        element.style['height'] = element.scrollHeight + 'px';
      });
    });

    const text_element:any = document.getElementById('make-question-text');
    text_element?.addEventListener('input', ()=>{
      //this.onchange?.({type: 'text', content: text_element.value});
      if(this.question) this.question.text = text_element.value;
    });

    const alternative_text_element:any = document.getElementById('make-question-add-text');
    alternative_text_element?.addEventListener('input', ()=>{
      //this.onchange?.({type: 'add_alternative_text', content: alternative_text_element.value});
      if(this.question) this.question.alternatives = this.alternatives;
    });
  }

  addAlternative(){
    const element:any = document.getElementById('make-question-add-text');

    if(element == null) return;

    const text = element.value;
    element.value = '';
    element.style['height'] = 'auto';

    if(text.length == 0) return;

    this.alternatives.push({text: text});

    this.onchange?.({type: 'alternatives', content: this.alternatives});
  }

  removeAlternative(index:number){
    this.alternatives.splice(index, 1);
    this.onchange?.({type: 'alternatives', content: this.alternatives});
  }

  setId(id:Number){
    this.id = id;
  }

  setAlternatives(alternatives:IAlternative[]){
    this.alternatives = alternatives;
  }

  setText(text:string){
    const element:any = document.getElementById('make-question-text');

    if(element == null) return;

    element.value = text;
  }

  onChangeEvent(on_change: (data:any) => void){
    this.onchange = on_change;
  }
}
