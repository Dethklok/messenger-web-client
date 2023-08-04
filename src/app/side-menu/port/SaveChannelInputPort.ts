import { Channel } from 'app/side-menu/domain/Channel';
import { SaveChannelDto } from 'app/side-menu/dto/SaveChannelDto';

export abstract class SaveChannelInputPort {
  abstract execute(saveChannelDto: SaveChannelDto): Promise<Channel>;
}
