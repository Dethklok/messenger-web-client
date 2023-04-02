import { SaveMessageDto } from 'app/core/messaging/dto/SaveMessageDto';

export abstract class PublishToMessageSocketOutputPort {
  abstract publish(message: SaveMessageDto): void;
}
