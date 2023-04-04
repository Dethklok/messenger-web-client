import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.css'],
})
export class SpaceComponent {
  @Input() direction!: 'vertical' | 'horizontal';
}
