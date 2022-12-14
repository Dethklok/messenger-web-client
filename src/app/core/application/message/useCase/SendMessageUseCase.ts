import { UseCase } from 'app/core/application/common/UseCase';
import { SaveMessageDto } from 'app/core/application/message/dto/SaveMessageDto';
import { MessageSocket } from 'app/core/application/message/port/MessageSocket';
import { SaveMessageOutputPort } from 'app/core/application/message/port/SaveMessageOutputPort';

export class SendMessageUseCase implements UseCase<SaveMessageDto> {
  constructor(
    private readonly messageSocket: MessageSocket,
    private readonly saveMessagePort: SaveMessageOutputPort
  ) {}

  execute(messageDto: SaveMessageDto): void {
    this.messageSocket.publish(messageDto);
  }
}
