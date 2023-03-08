import { Injectable } from '@angular/core';
import { WebsocketService } from 'app/adapters/server-messaging';
import { SaveMessageDto } from 'app/core/application/message/dto/SaveMessageDto';
import { MessageSocket } from 'app/core/application/message/port/MessageSocket';
import { MessageDto } from '../../core/application/message/dto/MessageDto';

@Injectable()
export class ServerMessageSocket implements MessageSocket {
  private readonly DESTINATION = '/message';

  constructor(private readonly websocketService: WebsocketService) {}

  publish(message: SaveMessageDto) {
    this.websocketService.publish({
      destination: this.DESTINATION,
      body: message,
    });
  }

  subscribe(onReceive: (message: MessageDto) => void) {
    this.websocketService
      .watch<MessageDto>({ destination: this.DESTINATION })
      .subscribe(onReceive);
  }
}
