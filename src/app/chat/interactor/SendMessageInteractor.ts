import { SaveMessageDto } from 'app/chat/dto/SaveMessageDto';
import { PublishToMessageSocketOutputPort } from 'app/chat/port/out/PublishToMessageSocketOutputPort';
import { SendMessageInputPort } from '../port/in/SendMessageInputPort';

export class SendMessageInteractor implements SendMessageInputPort {
  constructor(
    private readonly publishToMessageSocketOutputPort: PublishToMessageSocketOutputPort
  ) {}

  execute(saveMessageDto: SaveMessageDto): void {
    this.publishToMessageSocketOutputPort.publish(saveMessageDto);
  }
}
