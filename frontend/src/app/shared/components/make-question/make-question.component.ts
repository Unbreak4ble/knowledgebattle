import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IAlternative } from '../../../core/interfaces/question/alternative.interface';
import { IQuestion } from '../../../core/interfaces/question/question.interface';
import { TextareaComponent } from '../textarea/textarea.component';
import { MessageboxService } from '../../../core/services/messagebox/messagebox.service';

@Component({
  selector: 'app-make-question',
  templateUrl: './make-question.component.html',
  styleUrl: './make-question.component.scss'
})
export class MakeQuestionComponent {
  //@ViewChildren('alternatives-input') textareas: QueryList<TextareaComponent>|null = null;
  @ViewChild('add_alternative_text') textarea_add: TextareaComponent|undefined;
  id: Number = 0;
  alternatives: IAlternative[] = [];
  onchange: ((data:any) => void)|null =  null;
  question:IQuestion|null = null;

  constructor(private messageService: MessageboxService){

  }

  ngAfterViewInit(){
    this.setup();
  }

  setup(){
    this.setupEvents();
  }

  setupEvents(){

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

  handleTextInput(event:any){
    if(!this.question) return;

    this.question.text = event.value;
  }

  handleAlternativeTextInput(event:any){
    const id = Number(event.id.match(/\-([0-9]+)/gim)?.[0].replaceAll('-', '') || 0);
    
    if(this.question?.alternatives[id])
      (this.question?.alternatives)[id].text = event.value;
  }

  addAlternative(){
    if(!this.textarea_add) return;

    const text = this.textarea_add.text || "";
    this.textarea_add.reset_input();

    if(text.length == 0) return;

    this.alternatives.push({text: text});

    this.onchange?.({type: 'alternatives', content: this.alternatives});
  }

  async removeAlternative(index:number){
    const prompt = await new Promise(resolve => this.messageService.getComponent()?.confirm("", "Do you really want to delete this alternative?", resolve));
    if(!prompt) return;

    this.alternatives.splice(index, 1);

    if(this.question)
      this.question.correct = -1;

    this.onchange?.({type: 'alternatives', content: this.alternatives});
  }

  markAlternative(index:number){
    if(!this.question) return;

    this.question.correct = index;
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
