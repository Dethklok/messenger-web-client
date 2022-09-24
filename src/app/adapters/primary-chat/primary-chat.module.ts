import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageStore } from 'app/adapters/primary-chat/message.store';
import { ReactiveMessageStore } from 'app/adapters/primary-chat/reactive-message.store';
import { ServerMessageSocket } from 'app/adapters/primary-chat/server-message.socket';
import { ServerCommunicationModule } from 'app/adapters/server-communication';
import { ServerMessagingModule } from 'app/adapters/server-messaging';
import { FindAllMessagesOutputPort } from 'app/core/application/message/port/FindAllMessagesOutputPort';
import { MessageSocket } from 'app/core/application/message/port/MessageSocket';
import { SaveAllMessagesOutputPort } from 'app/core/application/message/port/SaveAllMessagesOutputPort';
import { SaveMessageOutputPort } from 'app/core/application/message/port/SaveMessageOutputPort';
import { LoadMessagesToStoreUseCase } from 'app/core/application/message/useCase/LoadMessagesToStoreUseCase';
import { SendMessageUseCase } from 'app/core/application/message/useCase/SendMessageUseCase';
import { SubscribeMessagesUseCase } from 'app/core/application/message/useCase/SubscribeMessagesUseCase';
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
      provide: FindAllMessagesOutputPort,
      useClass: ServerMessageRepository,
    },
    {
      provide: MessageSocket,
      useClass: ServerMessageSocket,
    },
    {
      provide: MessageStore,
      useClass: ReactiveMessageStore,
    },
    {
      provide: SaveAllMessagesOutputPort,
      useExisting: MessageStore,
    },
    {
      provide: SaveMessageOutputPort,
      useExisting: MessageStore,
    },
    {
      provide: LoadMessagesToStoreUseCase,
      deps: [FindAllMessagesOutputPort, SaveAllMessagesOutputPort],
      useFactory: (
        messageRepository: FindAllMessagesOutputPort,
        saveAllMessagesPort: SaveAllMessagesOutputPort
      ) =>
        new LoadMessagesToStoreUseCase(messageRepository, saveAllMessagesPort),
    },
    {
      provide: SendMessageUseCase,
      deps: [MessageSocket, SaveMessageOutputPort],
      useFactory: (
        messageSocket: MessageSocket,
        saveMessagePort: SaveMessageOutputPort
      ) => new SendMessageUseCase(messageSocket, saveMessagePort),
    },
    {
      provide: SubscribeMessagesUseCase,
      deps: [MessageSocket, SaveMessageOutputPort],
      useFactory: (
        messageSocket: MessageSocket,
        saveMessagePort: SaveMessageOutputPort
      ) => new SubscribeMessagesUseCase(messageSocket, saveMessagePort),
    },
  ],
  exports: [MessageListComponent],
})
export class PrimaryChatModule {}
