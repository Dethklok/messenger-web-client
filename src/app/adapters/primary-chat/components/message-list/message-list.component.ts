import { Component, OnInit } from '@angular/core';
import { ReactiveMessageStore } from 'app/adapters/primary-chat/reactive-message.store';
import { LoadMessagesToStoreUseCase } from 'app/core/application/message/useCase/LoadMessagesToStoreUseCase';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  constructor(
    private readonly messageStore: ReactiveMessageStore,
    private readonly loadMessagesToStoreUseCase: LoadMessagesToStoreUseCase
  ) {}

  ngOnInit(): void {
    this.loadMessagesToStoreUseCase.execute();
  }

  getMessages() {
    return this.messageStore.findAll();
  }
}
