import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  template: '<nz-avatar [nzSrc]="src" nzIcon="user" />',
})
export class AvatarComponent {
  @Input() src?: string;
}
