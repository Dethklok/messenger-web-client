import { GetMessageStreamOutputPort } from 'app/chat/port/out/GetMessageStreamOutputPort';
import { PageableResourceCollectionFactory } from 'app/server-communication/domain/PageableResourceCollectionFactory';
import { Stream } from 'app/shared/domain/streamApi/Stream';
import { Message } from '../domain/Message';
import { MessageFactory } from '../domain/MessageFactory';
import { StreamingCacheableDataSource } from '../domain/StreamingCacheableDataSource';
import { MessageDto } from '../dto/MessageDto';
import { CreateMessageDataSourceInputPort } from '../port/in/CreateMessageDataSourceInputPort';
import { FindLatestMessagesOutputPort } from '../port/out/FindLatestMessagesOutputPort';

export class CreateMessageCacheableDataSourceInteractor
  implements CreateMessageDataSourceInputPort
{
  private messageFactory = new MessageFactory();
  private resourceCollectionFactory = new PageableResourceCollectionFactory();

  constructor(
    private readonly findLatestMessagesOutputPort: FindLatestMessagesOutputPort,
    private readonly getMessageStreamOutputPort: GetMessageStreamOutputPort
  ) {}

  async execute(
    outputStream: Stream<Message>
  ): Promise<StreamingCacheableDataSource<Message>> {
    const messageMapper = (dto: MessageDto) => this.messageFactory.fromDto(dto);

    const inputMessageStream = this.getMessageStreamOutputPort
      .getStream()
      .map(messageMapper);

    const latestMessagesCollection =
      await this.findLatestMessagesOutputPort.findLatestMessages();
    const resourceCollection = this.resourceCollectionFactory.createWithMapper(
      latestMessagesCollection,
      messageMapper
    );

    const latestMessages = latestMessagesCollection.getResources();
    const earliestDate =
      latestMessages[latestMessages.length - 1]?.createdAt ?? undefined;

    const getNextCollection = earliestDate
      ? async () => {
          const collection =
            await this.findLatestMessagesOutputPort.findMessagesBeforeDate(
              earliestDate
            );
          return this.resourceCollectionFactory.createWithMapper(
            collection,
            messageMapper
          );
        }
      : undefined;

    return new StreamingCacheableDataSource<Message>({
      resourceCollection,
      getNextCollection,
      newValueInputStream: inputMessageStream,
      newValueOutputStream: outputStream,
    });
  }
}
