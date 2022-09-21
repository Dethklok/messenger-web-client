import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveMessageStore } from 'app/adapters/primary-chat/reactive-message.store';
import { ServerMessageSocket } from 'app/adapters/primary-chat/server-message.socket';
import { ServerCommunicationModule } from 'app/adapters/server-communication';
import { ServerMessagingModule } from 'app/adapters/server-messaging';
import { MessageRepository } from 'app/core/application/message/port/MessageRepository';
import { MessageSocket } from 'app/core/application/message/port/MessageSocket';
import { MessageStore } from 'app/core/application/message/port/MessageStore';
import { LoadMessagesToStoreUseCase } from 'app/core/application/message/useCase/LoadMessagesToStoreUseCase';
import { SendMessageUseCase } from 'app/core/application/message/useCase/SendMessageUseCase';
import { MessageInputComponent } from './components/message-input/message-input.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { ServerMessageRepository } from './server-message.repository';

@NgModule({
  declarations: [MessageListComponent, MessageInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ServerCommunicationModule,
    ServerMessagingModule,
  ],
  providers: [
    {
      provide: MessageRepository,
      useClass: ServerMessageRepository,
    },
    {
      provide: MessageSocket,
      useClass: ServerMessageSocket,
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
    {
      provide: SendMessageUseCase,
      deps: [MessageSocket, ReactiveMessageStore],
      useFactory: (messageSocket: MessageSocket, messageStore: MessageStore) =>
        new SendMessageUseCase(messageSocket, messageStore),
    },
  ],
  exports: [MessageListComponent],
})
export class PrimaryChatModule {}
