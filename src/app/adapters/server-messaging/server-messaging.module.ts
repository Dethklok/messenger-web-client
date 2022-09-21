import { NgModule } from '@angular/core';
import { RxStompWebsocketService } from 'app/adapters/server-messaging/rx-stomp-websocket.service';
import { WebsocketService } from './websocket.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    {
      provide: WebsocketService,
      useClass: RxStompWebsocketService,
    },
  ],
})
export class ServerMessagingModule {}
