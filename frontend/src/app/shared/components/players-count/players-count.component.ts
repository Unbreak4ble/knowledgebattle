import { Component } from '@angular/core';

@Component({
  selector: 'app-players-count',
  templateUrl: './players-count.component.html',
  styleUrl: './players-count.component.scss'
})
export class PlayersCountComponent {
  count:Number = 0;
}
