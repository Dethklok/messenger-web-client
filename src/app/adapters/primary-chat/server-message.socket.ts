import { Injectable } from '@angular/core';
import { WebsocketService } from 'app/adapters/server-messaging';
import { SaveMessageDto } from 'app/core/messaging/dto/SaveMessageDto';
import { PublishToMessageSocketOutputPort } from 'app/core/messaging/port/out/PublishToMessageSocketOutputPort';
import { MessageDto } from '../../core/messaging/dto/MessageDto';

@Injectable()
export class ServerMessageSocket implements PublishToMessageSocketOutputPort {
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
