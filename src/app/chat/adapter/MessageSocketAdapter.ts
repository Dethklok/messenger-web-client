import { Injectable } from '@angular/core';
import { SaveMessageDto } from 'app/chat/dto/SaveMessageDto';
import { WebsocketService } from 'app/server-communication';
import { SubscribableRxAdapter } from 'app/shared/adapter/SubscribableRxAdapter';
import { Subscribable } from 'app/shared/domain/streamApi/Subscribable';
import { MessageDto } from '../dto/MessageDto';
import { GetMessageStreamOutputPort } from '../port/out/GetMessageStreamOutputPort';
import { PublishToMessageSocketOutputPort } from '../port/out/PublishToMessageSocketOutputPort';

@Injectable()
export class MessageSocketAdapter
  implements PublishToMessageSocketOutputPort, GetMessageStreamOutputPort
{
  private readonly DESTINATION = '/message';

  constructor(private readonly websocketService: WebsocketService) {}

  publish(message: SaveMessageDto) {
    this.websocketService.publish({
      destination: this.DESTINATION,
      body: message,
    });
  }

  getStream(): Subscribable<MessageDto> {
    const observable = this.websocketService.watch<MessageDto>({
      destination: this.DESTINATION,
    });
    return new SubscribableRxAdapter(observable);
  }
}
