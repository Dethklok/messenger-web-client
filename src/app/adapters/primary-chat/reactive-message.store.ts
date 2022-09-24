import { Injectable } from '@angular/core';
import { SaveAllMessagesOutputPort } from 'app/core/application/message/port/SaveAllMessagesOutputPort';
import { SaveMessageOutputPort } from 'app/core/application/message/port/SaveMessageOutputPort';
import { Message } from 'app/core/domain/message';
import { BehaviorSubject, map, Observable, shareReplay } from 'rxjs';
import { MessageStore } from './message.store';

@Injectable()
export class ReactiveMessageStore
  implements MessageStore, SaveAllMessagesOutputPort, SaveMessageOutputPort
{
  private readonly messagesById$ = new BehaviorSubject(
    new Map<number, Message>()
  );

  saveAll(messagesById: Map<number, Message>) {
    this.messagesById$.next(messagesById);
  }

  save(message: Message) {
    const messages = this.messagesById$.getValue().set(message.id, message);
    this.messagesById$.next(messages);
  }

  findAll(): Observable<Message[]> {
    return this.messagesById$.pipe(
      map((messagesById) => Array.from(messagesById.values())),
      shareReplay(1)
    );
  }
}
