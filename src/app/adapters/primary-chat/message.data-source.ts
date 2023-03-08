import { Injectable } from '@angular/core';
import { map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { MessageDto } from '../../core/application/message/dto/MessageDto';
import { MessageFactory } from '../../core/application/message/MessageFactory';
import { MessageSocket } from '../../core/application/message/port/MessageSocket';
import { Message } from '../../core/domain/message.entity';
import { HateoasClient } from '../server-communication/hateoas/HateoasClient';
import { ResourceCollection } from '../server-communication/hateoas/ResourceCollection';
import { SortOrder } from '../server-communication/hateoas/SortOrder';
import { InfiniteScrollableListDataSource } from '../shared/components/infinite-scrollable-list/InfiniteScrollableListDataSource';
import { InfiniteScrollableListDataSourceOptions } from '../shared/components/infinite-scrollable-list/InfiniteScrollableListDataSourceOptions';

@Injectable()
export class MessageDataSource
  implements InfiniteScrollableListDataSource<Message>
{
  private nextCollection$?: Observable<ResourceCollection<MessageDto>>;
  private cache = new Map<number, Message>();
  private messageFactory = new MessageFactory();
  lastIndex = -1;

  constructor(
    private hateoasClient: HateoasClient,
    private messageSocket: MessageSocket
  ) {}

  initialize(): Observable<InfiniteScrollableListDataSourceOptions> {
    this.messageSocket.subscribe((dto) => {
      const message = this.messageFactory.fromDto(dto);
      const index = this.lastIndex + 1;
      this.saveMessageToCache(index, message);
      this.onPush$.next([message]);
    });

    return this.hateoasClient
      .findAll<MessageDto>('messages', {
        sort: { createdAt: SortOrder.DESC },
      })
      .pipe(
        tap(
          (collection) =>
            (this.nextCollection$ = this.hateoasClient.findAll<MessageDto>(
              'messages',
              {
                search: {
                  rel: 'createdAtLessThan',
                  key: 'createdAt',
                  value:
                    collection.resources[collection.resources.length - 1]
                      .createdAt,
                },
                sort: { createdAt: SortOrder.DESC },
              }
            ))
        ),
        tap((collection) =>
          this.saveItemsToCache(
            collection.resources,
            collection.page.totalElements - 1
          )
        ),
        switchMap((collection) =>
          of({ inverse: true, startIndex: collection.page.totalElements - 1 })
        )
      );
  }

  loadItems(index: number, count: number): Observable<Message[]> {
    if (this.isItemsCached(index, count)) {
      return of(this.getFromCache(index, count));
    }

    if (!this.nextCollection$) {
      return of([]);
    }

    return this.nextCollection$.pipe(
      tap(
        (collection) =>
          (this.nextCollection$ = collection.hasNextPage()
            ? collection.getNextPage()
            : undefined)
      ),
      tap(({ resources, page }) =>
        this.saveItemsToCache(
          resources,
          page.totalElements - page.number * page.size - 1
        )
      ),
      map(() => this.getFromCache(index, count))
    );
  }

  onPush$: Subject<Message[]> = new Subject<Message[]>();

  private isItemsCached(index: number, count: number) {
    if (index + count > this.lastIndex) return true;
    return this.cache.has(index) && this.cache.has(index + count);
  }

  private getFromCache(index: number, count: number) {
    const result = [];

    for (let i = index; i < index + count; i++) {
      const message = this.cache.get(i);
      if (message) {
        result.push(message);
      }
    }

    return result;
  }

  private saveItemsToCache(messageDtos: MessageDto[], startIndex: number) {
    this.messageFactory
      .fromDtos(messageDtos)
      .forEach((message, index) =>
        this.saveMessageToCache(startIndex - index, message)
      );
  }

  private saveMessageToCache(index: number, message: Message) {
    this.cache.set(index, message);
    if (index > this.lastIndex) {
      this.lastIndex = index;
    }
  }
}
