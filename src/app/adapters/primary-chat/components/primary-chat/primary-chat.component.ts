import { Component } from '@angular/core';
import { SaveMessageDto } from '../../../../core/application/message/dto/SaveMessageDto';
import { SendMessageUseCase } from '../../../../core/application/message/useCase/SendMessageUseCase';
import { MessageDataSource } from '../../message.data-source';

@Component({
  selector: 'app-primary-chat',
  templateUrl: './primary-chat.component.html',
})
export class PrimaryChatComponent {
  constructor(
    private readonly messageDataSource: MessageDataSource,
    private readonly sendMessageUseCase: SendMessageUseCase
  ) {}

  getMessageDataSource() {
    return this.messageDataSource;
  }

  sendMessage(value: SaveMessageDto) {
    this.sendMessageUseCase.execute(value);
  }
}
