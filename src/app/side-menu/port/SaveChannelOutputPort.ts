import { ChannelDto } from 'app/side-menu/dto/ChannelDto';
import { SaveChannelDto } from 'app/side-menu/dto/SaveChannelDto';

export abstract class SaveChannelOutputPort {
  abstract saveChannel(saveChannelDto: SaveChannelDto): Promise<ChannelDto>;
}
