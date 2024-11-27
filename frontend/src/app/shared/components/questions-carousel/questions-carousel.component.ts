import { Component } from '@angular/core';
import { questions } from './questions-carousel.headers';

@Component({
  selector: 'app-questions-carousel',
  templateUrl: './questions-carousel.component.html',
  styleUrl: './questions-carousel.component.scss'
})
export class QuestionsCarouselComponent {
  questions: any[] = questions;
}
