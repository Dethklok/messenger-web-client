import { Message } from 'app/core/domain/message';

export abstract class FindAllMessagesOutputPort {
  abstract findAll(): Promise<Message[]>;
}
