import { Message } from 'app/core/domain/message';

export abstract class SaveMessageOutputPort {
  abstract save(message: Message): void;
}
