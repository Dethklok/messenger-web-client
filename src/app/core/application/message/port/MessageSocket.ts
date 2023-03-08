import { SaveMessageDto } from 'app/core/application/message/dto/SaveMessageDto';
import { MessageDto } from '../dto/MessageDto';

export abstract class MessageSocket {
  abstract publish(message: SaveMessageDto): void;
  abstract subscribe(onReceive: (message: MessageDto) => void): void;
}
