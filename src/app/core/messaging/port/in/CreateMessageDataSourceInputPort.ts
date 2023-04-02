import { Observer } from '../../../kernel/streamApi/Observer';
import { Subscribable } from '../../../kernel/streamApi/Subscribable';
import { Message } from '../../domain/Message';
import { StreamingCacheableDataSource } from '../../domain/StreamingCacheableDataSource';
import { MessageDto } from '../../dto/MessageDto';

export abstract class CreateMessageDataSourceInputPort {
  abstract execute(
    inputStream: Subscribable<MessageDto>,
    outputStream: Observer<Message>
  ): Promise<StreamingCacheableDataSource<Message>>;
}
