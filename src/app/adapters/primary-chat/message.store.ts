import { Message } from 'app/core/domain/message';
import { Observable } from 'rxjs';

export abstract class MessageStore {
  abstract findAll(): Observable<Message[]>;
}
