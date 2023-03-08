import { Message } from 'app/core/domain/message.entity';

export abstract class SaveMessageOutputPort {
  abstract save(message: Message): void;
}
