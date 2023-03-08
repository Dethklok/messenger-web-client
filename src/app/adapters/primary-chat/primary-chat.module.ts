import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ServerMessageSocket } from 'app/adapters/primary-chat/server-message.socket';
import { ServerCommunicationModule } from 'app/adapters/server-communication';
import { ServerMessagingModule } from 'app/adapters/server-messaging';
import { MessageSocket } from 'app/core/application/message/port/MessageSocket';
import { SendMessageUseCase } from 'app/core/application/message/useCase/SendMessageUseCase';
import { SharedModule } from '../shared/shared.module';
import { PrimaryChatComponent } from './components/primary-chat/primary-chat.component';
import { MessageDataSource } from './message.data-source';

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
      provide: MessageSocket,
      useClass: ServerMessageSocket,
    },
    {
      provide: SendMessageUseCase,
      deps: [MessageSocket],
      useFactory: (messageSocket: MessageSocket) =>
        new SendMessageUseCase(messageSocket),
    },
    MessageDataSource,
  ],
  exports: [PrimaryChatComponent],
})
export class PrimaryChatModule {}
