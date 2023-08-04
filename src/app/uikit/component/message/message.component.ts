import { Component, Input } from '@angular/core';
import { Message } from 'app/chat/domain/Message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
})
export class MessageComponent {
  @Input() message!: Message;
}
