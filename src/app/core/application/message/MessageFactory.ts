import { Message } from '../../domain/message.entity';
import { User } from '../../domain/user.entity';
import { MessageDto } from './dto/MessageDto';

export class MessageFactory {
  fromDto({ id, content, createdAt, updatedAt, user }: MessageDto): Message {
    return new Message(
      id,
      content,
      new Date(createdAt),
      new Date(updatedAt),
      new User(user.id, user.username, user.firstName, user.lastName)
    );
  }

  fromDtos(dtos: MessageDto[]): Message[] {
    return dtos.map((dto) => this.fromDto(dto));
  }
}
