import { SaveMessageDto } from 'app/chat/dto/SaveMessageDto';

export abstract class PublishToMessageSocketOutputPort {
  abstract publish(message: SaveMessageDto): void;
}
