import { Injectable } from '@angular/core';
import { MessageStore } from 'app/core/application/port/MessageStore';
import { Message } from 'app/core/domain/message';
import { BehaviorSubject, map, Observable, shareReplay } from 'rxjs';

@Injectable()
export class ReactiveMessageStore implements MessageStore {
  private readonly messagesById$ = new BehaviorSubject(
    new Map<number, Message>()
  );

  saveAll(messagesById: Map<number, Message>) {
    this.messagesById$.next(messagesById);
  }

  findAll(): Observable<Message[]> {
    return this.messagesById$.pipe(
      map((messagesById) => Array.from(messagesById.values())),
      shareReplay(1)
    );
  }
}
