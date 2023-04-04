import { Injectable } from '@angular/core';
import { HateoasClient } from 'app/server-communication';
import { SortOrder } from 'app/server-communication/adapter/hateoas/SortOrder';
import { PageableResourceCollection } from 'app/server-communication/domain/PageableResourceCollection';
import { firstValueFrom } from 'rxjs';
import { MessageDto } from '../dto/MessageDto';
import { FindLatestMessagesOutputPort } from '../port/out/FindLatestMessagesOutputPort';

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
