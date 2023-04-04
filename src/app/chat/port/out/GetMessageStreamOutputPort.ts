import { MessageDto } from 'app/chat/dto/MessageDto';
import { Subscribable } from 'app/shared/domain/streamApi/Subscribable';

export abstract class GetMessageStreamOutputPort {
  abstract getStream(): Subscribable<MessageDto>;
}
