import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageRepository } from 'app/core/application/message/port/MessageRepository';
import { Message } from 'app/core/domain/message';
import { firstValueFrom, map } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServerMessageRepository implements MessageRepository {
  constructor(private readonly http: HttpClient) {}

  findAll(): Promise<Message[]> {
    return firstValueFrom(
      this.http
        .get<{ _embedded: { messages: Message[] } }>(
          `${environment.serverApiUri}/messages`
        )
        .pipe(map(({ _embedded }) => _embedded.messages))
    );
  }
}
