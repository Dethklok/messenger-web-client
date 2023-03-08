import { UseCase } from 'app/core/application/common/UseCase';
import { MessageSocket } from 'app/core/application/message/port/MessageSocket';
import { SaveMessageOutputPort } from 'app/core/application/message/port/SaveMessageOutputPort';
import { MessageFactory } from '../MessageFactory';

export class SubscribeMessagesUseCase implements UseCase<void> {
  constructor(
    private readonly messageSocket: MessageSocket,
    private readonly saveMessagePort: SaveMessageOutputPort
  ) {}

  private messageFactory = new MessageFactory();

  execute(): void {
    this.messageSocket.subscribe((message) =>
      this.saveMessagePort.save(this.messageFactory.fromDto(message))
    );
  }
}
