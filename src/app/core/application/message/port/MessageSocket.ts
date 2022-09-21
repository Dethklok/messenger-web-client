import { SaveMessageDto } from 'app/core/application/message/dto/SaveMessageDto';
import { Message } from 'app/core/domain/message';

export abstract class MessageSocket {
  abstract publish(message: SaveMessageDto): void;
  abstract subscribe(onReceive: (message: Message) => void): void;
}
