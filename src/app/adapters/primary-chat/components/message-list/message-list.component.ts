import { Component, Input } from '@angular/core';
import { Message } from 'app/core/domain/message';

@Component({
  selector: 'app-message-list[messages]',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent {
  @Input()
  messages: Message[] = [];

  constructor() {}

  trackByMessages(index: number, message: Message): number {
    return message.id;
  }
}
