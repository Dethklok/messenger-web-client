import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-flex',
  templateUrl: './flex.component.html',
  styleUrls: ['./flex.component.css'],
})
export class FlexComponent implements OnInit {
  @Input() direction: 'vertical' | 'horizontal' = 'horizontal';
  @Input() @HostBinding('class.flex_block') block: boolean = true;
  @HostBinding('class.flex') flex = true;
  @HostBinding('class') flexDirection = '';

  ngOnInit(): void {
    this.flexDirection = `flex_${this.direction}`;
  }
}
