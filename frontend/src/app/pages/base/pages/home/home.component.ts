import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private meta: Meta, private pageTitle: Title){
    this.setupTags();
  }

  setupTags(){
    this.pageTitle.setTitle("QuizRoom Home");
    this.meta.updateTag({name: 'title', content: "QuizRoom Home"});
  }
}
