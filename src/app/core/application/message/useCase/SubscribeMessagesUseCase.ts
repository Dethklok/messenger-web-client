import { UseCase } from 'app/core/application/common/UseCase';
import { MessageSocket } from 'app/core/application/message/port/MessageSocket';
import { SaveMessageOutputPort } from 'app/core/application/message/port/SaveMessageOutputPort';

export class SubscribeMessagesUseCase implements UseCase<void> {
  constructor(
    private readonly messageSocket: MessageSocket,
    private readonly saveMessagePort: SaveMessageOutputPort
  ) {}

  execute(): void {
    this.messageSocket.subscribe((message) =>
      this.saveMessagePort.save(message)
    );
  }
}
