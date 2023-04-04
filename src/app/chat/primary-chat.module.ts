import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GetMessageStreamOutputPort } from 'app/chat/port/out/GetMessageStreamOutputPort';
import { ServerCommunicationModule } from 'app/server-communication';
import { UiKitModule } from 'app/uikit/ui-kit.module';
import { FindLatestMessagesAdapter } from './adapter/FindLatestMessagesAdapter';
import { MessageSocketAdapter } from 'app/chat/adapter/MessageSocketAdapter';
import { PrimaryChatComponent } from './components/primary-chat/primary-chat.component';
import { CreateMessageCacheableDataSourceInteractor } from './interactor/CreateMessageCacheableDataSourceInteractor';
import { SendMessageInteractor } from './interactor/SendMessageInteractor';
import { CreateMessageDataSourceInputPort } from './port/in/CreateMessageDataSourceInputPort';
import { SendMessageInputPort } from './port/in/SendMessageInputPort';
import { FindLatestMessagesOutputPort } from './port/out/FindLatestMessagesOutputPort';
import { PublishToMessageSocketOutputPort } from './port/out/PublishToMessageSocketOutputPort';

@NgModule({
  declarations: [PrimaryChatComponent],
  imports: [
    CommonModule,
    UiKitModule,
    ReactiveFormsModule,
    ServerCommunicationModule,
  ],
  providers: [
    MessageSocketAdapter,
    {
      provide: FindLatestMessagesOutputPort,
      useClass: FindLatestMessagesAdapter,
    },
    {
      provide: PublishToMessageSocketOutputPort,
      useExisting: MessageSocketAdapter,
    },
    {
      provide: GetMessageStreamOutputPort,
      useExisting: MessageSocketAdapter,
    },
    {
      provide: CreateMessageDataSourceInputPort,
      deps: [FindLatestMessagesOutputPort, GetMessageStreamOutputPort],
      useFactory: (
        findLatestMessagesOutputPort: FindLatestMessagesOutputPort,
        getMessageStreamOutputPort: GetMessageStreamOutputPort
      ) =>
        new CreateMessageCacheableDataSourceInteractor(
          findLatestMessagesOutputPort,
          getMessageStreamOutputPort
        ),
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
