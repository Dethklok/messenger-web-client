import { SaveMessageDto } from '../../dto/SaveMessageDto';

export abstract class SendMessageInputPort {
  abstract execute(saveMessageDto: SaveMessageDto): void;
}
