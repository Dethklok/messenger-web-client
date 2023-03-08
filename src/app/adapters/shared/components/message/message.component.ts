import { Component, Input } from '@angular/core';
import { Message } from 'app/core/domain/message.entity';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
})
export class MessageComponent {
  @Input() message!: Message;
}
