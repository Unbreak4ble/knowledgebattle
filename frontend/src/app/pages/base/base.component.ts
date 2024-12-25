import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent {
  constructor(private meta: Meta, private pageTitle: Title){
    this.setupTags();
  }

  setupTags(){
    this.pageTitle.setTitle("QuizRoom");
    this.meta.addTag({name: 'title', content: "QuizRoom"});
    this.meta.addTag({name: 'description', content: "Let's Play!!! Join smart rooms and test your knowledge among players"});
  }

}
