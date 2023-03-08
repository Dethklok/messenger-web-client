import { MessageDto } from '../dto/MessageDto';

export abstract class FindAllMessagesOutputPort {
  abstract findAll(): Promise<MessageDto[]>;
}
