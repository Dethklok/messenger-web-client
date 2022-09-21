import { Injectable } from '@angular/core';
import { WebsocketService } from 'app/adapters/server-messaging';
import { SaveMessageDto } from 'app/core/application/message/dto/SaveMessageDto';
import { MessageSocket } from 'app/core/application/message/port/MessageSocket';
import { Message } from 'app/core/domain/message';

@Injectable()
export class ServerMessageSocket implements MessageSocket {
  private readonly DESTINATION = '/message';

  constructor(private readonly websocketService: WebsocketService) {
    console.log(websocketService);
  }

  publish(message: SaveMessageDto) {
    this.websocketService.publish({
      destination: this.DESTINATION,
      body: message,
    });
  }

  subscribe(onReceive: (message: Message) => void) {
    this.websocketService.subscribe({ destination: this.DESTINATION });
  }
}
