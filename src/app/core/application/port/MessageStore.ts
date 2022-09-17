import { Message } from 'app/core/domain/message';

export abstract class MessageStore {
  abstract saveAll(messagesById: Map<number, Message>): void;
}
