import { SaveMessageDto } from 'app/core/application/message/dto/SaveMessageDto';
import { MessageSocket } from 'app/core/application/message/port/MessageSocket';
import { MessageStore } from 'app/core/application/message/port/MessageStore';
import { UseCase } from 'app/core/application/common/UseCase';

export class SendMessageUseCase implements UseCase<SaveMessageDto> {
  constructor(
    private readonly messageSocket: MessageSocket,
    private readonly messageStore: MessageStore
  ) {}

  execute(messageDto: SaveMessageDto): void {
    this.messageSocket.publish(messageDto);
  }
}
