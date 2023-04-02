import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PageableResourceCollection } from '../../core/kernel/resourceCollection/PageableResourceCollection';
import { MessageDto } from '../../core/messaging/dto/MessageDto';
import { FindLatestMessagesOutputPort } from '../../core/messaging/port/out/FindLatestMessagesOutputPort';
import { HateoasClient } from '../server-communication/hateoas/HateoasClient';
import { SortOrder } from '../server-communication/hateoas/SortOrder';

@Injectable()
export class FindLatestMessagesAdapter implements FindLatestMessagesOutputPort {
  private readonly RESOURCE_NAME = 'messages';

  constructor(private readonly hateoasClient: HateoasClient) {}

  findLatestMessages(): Promise<PageableResourceCollection<MessageDto>> {
    return firstValueFrom(
      this.hateoasClient.findAll<MessageDto>(this.RESOURCE_NAME, {
        sort: { createdAt: SortOrder.DESC },
      })
    );
  }

  findMessagesBeforeDate(
    date: string
  ): Promise<PageableResourceCollection<MessageDto>> {
    return firstValueFrom(
      this.hateoasClient.findAll<MessageDto>(this.RESOURCE_NAME, {
        sort: { createdAt: SortOrder.DESC },
        search: {
          rel: 'createdAtLessThan',
          key: 'createdAt',
          value: date,
        },
      })
    );
  }
}
