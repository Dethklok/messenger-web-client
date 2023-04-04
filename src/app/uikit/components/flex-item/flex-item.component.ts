import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-flex-item',
  templateUrl: './flex-item.component.html',
  styleUrls: ['./flex-item.component.css'],
})
export class FlexItemComponent {
  @Input() @HostBinding('class.flex-item_grow') growable = false;
}
