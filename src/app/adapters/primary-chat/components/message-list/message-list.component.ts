import { Component, OnInit } from '@angular/core';
import { MessageStore } from 'app/adapters/primary-chat/message.store';
import { LoadMessagesToStoreUseCase } from 'app/core/application/message/useCase/LoadMessagesToStoreUseCase';
import { SubscribeMessagesUseCase } from 'app/core/application/message/useCase/SubscribeMessagesUseCase';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  constructor(
    private readonly messageStore: MessageStore,
    private readonly loadMessagesToStoreUseCase: LoadMessagesToStoreUseCase,
    private readonly subscribeMessagesUseCase: SubscribeMessagesUseCase
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadMessagesToStoreUseCase.execute();
    this.subscribeMessagesUseCase.execute();
  }

  getMessages() {
    return this.messageStore.findAll();
  }
}
