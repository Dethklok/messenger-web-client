import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ServerMessageSocket } from 'app/adapters/primary-chat/server-message.socket';
import { ServerCommunicationModule } from 'app/adapters/server-communication';
import { ServerMessagingModule } from 'app/adapters/server-messaging';
import { SendMessageInteractor } from 'app/core/messaging/interactor/SendMessageInteractor';
import { PublishToMessageSocketOutputPort } from 'app/core/messaging/port/out/PublishToMessageSocketOutputPort';
import { CreateMessageCacheableDataSourceInteractor } from '../../core/messaging/interactor/CreateMessageCacheableDataSourceInteractor';
import { CreateMessageDataSourceInputPort } from '../../core/messaging/port/in/CreateMessageDataSourceInputPort';
import { SendMessageInputPort } from '../../core/messaging/port/in/SendMessageInputPort';
import { FindLatestMessagesOutputPort } from '../../core/messaging/port/out/FindLatestMessagesOutputPort';
import { SharedModule } from '../shared/shared.module';
import { PrimaryChatComponent } from './components/primary-chat/primary-chat.component';
import { FindLatestMessagesAdapter } from './FindLatestMessagesAdapter';

@NgModule({
  declarations: [PrimaryChatComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ServerCommunicationModule,
    ServerMessagingModule,
  ],
  providers: [
    {
      provide: FindLatestMessagesOutputPort,
      useClass: FindLatestMessagesAdapter,
    },
    {
      provide: CreateMessageDataSourceInputPort,
      deps: [FindLatestMessagesOutputPort],
      useFactory: (
        findLatestMessagesOutputPort: FindLatestMessagesOutputPort
      ) =>
        new CreateMessageCacheableDataSourceInteractor(
          findLatestMessagesOutputPort
        ),
    },
    {
      provide: PublishToMessageSocketOutputPort,
      useClass: ServerMessageSocket,
    },
    {
      provide: SendMessageInputPort,
      deps: [PublishToMessageSocketOutputPort],
      useFactory: (
        publishToMessageSocketOutputPort: PublishToMessageSocketOutputPort
      ) => new SendMessageInteractor(publishToMessageSocketOutputPort),
    },
  ],
  exports: [PrimaryChatComponent],
})
export class PrimaryChatModule {}
