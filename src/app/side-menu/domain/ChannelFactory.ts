import { Channel } from 'app/side-menu/domain/Channel';
import { ChannelDto } from 'app/side-menu/dto/ChannelDto';

export class ChannelFactory {
  fromDto({ id, name, createdAt, updatedAt }: ChannelDto): Channel {
    return new Channel(id, name, new Date(createdAt), new Date(updatedAt));
  }
}
