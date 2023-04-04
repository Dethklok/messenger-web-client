import { PageableResourceCollection } from 'app/server-communication/domain/PageableResourceCollection';
import { MessageDto } from '../../dto/MessageDto';

export abstract class FindLatestMessagesOutputPort {
  abstract findLatestMessages(): Promise<
    PageableResourceCollection<MessageDto>
  >;

  abstract findMessagesBeforeDate(
    date: string
  ): Promise<PageableResourceCollection<MessageDto>>;
}
