import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HateoasClient } from './adapter/hateoas/HateoasClient';
import { HttpAuthInterceptor } from './adapter/http-auth.interceptor';
import { RxStompWebsocketService } from './adapter/websocket/rx-stomp-websocket.service';
import { WebsocketService } from './adapter/websocket/websocket.service';

@NgModule({
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthInterceptor,
      multi: true,
    },
    HateoasClient,
    {
      provide: WebsocketService,
      useClass: RxStompWebsocketService,
    },
  ],
})
export class ServerCommunicationModule {}
