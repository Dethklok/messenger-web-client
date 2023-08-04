import { SaveChannelInputPort } from 'app/side-menu/port/SaveChannelInputPort';
import { ChannelFactory } from 'app/side-menu/domain/ChannelFactory';
import { SaveChannelOutputPort } from 'app/side-menu/port/SaveChannelOutputPort';
import { Channel } from 'app/side-menu/domain/Channel';
import { SaveChannelDto } from 'app/side-menu/dto/SaveChannelDto';

export class SaveChannelInteractor implements SaveChannelInputPort {
  constructor(
    private readonly saveChannelOutputPort: SaveChannelOutputPort,
    private readonly channelFactory: ChannelFactory
  ) {}

  async execute(saveChannelDto: SaveChannelDto): Promise<Channel> {
    const dto = await this.saveChannelOutputPort.saveChannel(saveChannelDto);
    return this.channelFactory.fromDto(dto);
  }
}
