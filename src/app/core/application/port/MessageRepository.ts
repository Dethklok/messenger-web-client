import { Message } from 'app/core/domain/message';

export abstract class MessageRepository {
  abstract findAll(): Promise<Message[]>;
}
