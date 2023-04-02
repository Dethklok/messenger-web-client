import { SaveMessageDto } from 'app/core/messaging/dto/SaveMessageDto';
import { PublishToMessageSocketOutputPort } from 'app/core/messaging/port/out/PublishToMessageSocketOutputPort';
import { SendMessageInputPort } from '../port/in/SendMessageInputPort';

export class SendMessageInteractor implements SendMessageInputPort {
  constructor(
    private readonly publishToMessageSocketOutputPort: PublishToMessageSocketOutputPort
  ) {}

  execute(saveMessageDto: SaveMessageDto): void {
    this.publishToMessageSocketOutputPort.publish(saveMessageDto);
  }
}
