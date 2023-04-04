import { Observer } from 'app/shared/domain/streamApi/Observer';
import { Message } from '../../domain/Message';
import { StreamingCacheableDataSource } from '../../domain/StreamingCacheableDataSource';

export abstract class CreateMessageDataSourceInputPort {
  abstract execute(
    outputStream: Observer<Message>
  ): Promise<StreamingCacheableDataSource<Message>>;
}
