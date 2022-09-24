import { Message } from 'app/core/domain/message';

export abstract class SaveAllMessagesOutputPort {
  abstract saveAll(messagesById: Map<number, Message>): void;
}
