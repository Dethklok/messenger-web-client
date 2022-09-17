import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveMessageStore } from 'app/adapters/primary-chat/reactive-message.store';
import { ServerCommunicationModule } from 'app/adapters/server-communication';
import { MessageRepository } from 'app/core/application/port/MessageRepository';
import { MessageStore } from 'app/core/application/port/MessageStore';
import { LoadMessagesToStoreUseCase } from 'app/core/application/useCase/LoadMessagesToStoreUseCase';
import { MessageListComponent } from './components/message-list/message-list.component';
import { ServerMessageRepository } from './server-message.repository';

@NgModule({
  declarations: [MessageListComponent],
  imports: [CommonModule, ServerCommunicationModule],
  providers: [
    {
      provide: MessageRepository,
      useClass: ServerMessageRepository,
    },
    ReactiveMessageStore,
    {
      provide: LoadMessagesToStoreUseCase,
      deps: [MessageRepository, ReactiveMessageStore],
      useFactory: (
        messageRepository: MessageRepository,
        messageStore: MessageStore
      ) => new LoadMessagesToStoreUseCase(messageRepository, messageStore),
    },
  ],
  exports: [MessageListComponent],
})
export class PrimaryChatModule {}
