import { Injectable } from '@angular/core';
import { HateoasClient } from 'app/server-communication';
import { firstValueFrom } from 'rxjs';
import { ChannelDto } from 'app/side-menu/dto/ChannelDto';
import { SaveChannelDto } from 'app/side-menu/dto/SaveChannelDto';
import { SaveChannelOutputPort } from 'app/side-menu/port/SaveChannelOutputPort';

@Injectable()
export class SaveChannelAdapter implements SaveChannelOutputPort {
  constructor(private readonly hateoasClient: HateoasClient) {}
  saveChannel(saveChannelDto: SaveChannelDto): Promise<ChannelDto> {
    return firstValueFrom(
      this.hateoasClient.save<ChannelDto>('channels', saveChannelDto)
    );
  }
}
