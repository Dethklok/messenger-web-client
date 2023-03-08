import { Message } from 'app/core/domain/message.entity';

export abstract class SaveAllMessagesOutputPort {
  abstract saveAll(messagesById: Map<number, Message>): void;
}
