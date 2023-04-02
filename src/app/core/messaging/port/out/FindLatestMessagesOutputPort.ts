import { PageableResourceCollection } from '../../../kernel/resourceCollection/PageableResourceCollection';
import { MessageDto } from '../../dto/MessageDto';

export abstract class FindLatestMessagesOutputPort {
  abstract findLatestMessages(): Promise<
    PageableResourceCollection<MessageDto>
  >;

  abstract findMessagesBeforeDate(
    date: string
  ): Promise<PageableResourceCollection<MessageDto>>;
}
