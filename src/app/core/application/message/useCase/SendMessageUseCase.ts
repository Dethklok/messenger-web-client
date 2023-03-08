import { UseCase } from 'app/core/application/common/UseCase';
import { SaveMessageDto } from 'app/core/application/message/dto/SaveMessageDto';
import { MessageSocket } from 'app/core/application/message/port/MessageSocket';

export class SendMessageUseCase implements UseCase<SaveMessageDto> {
  constructor(private readonly messageSocket: MessageSocket) {}

  execute(messageDto: SaveMessageDto): void {
    this.messageSocket.publish(messageDto);
  }
}
