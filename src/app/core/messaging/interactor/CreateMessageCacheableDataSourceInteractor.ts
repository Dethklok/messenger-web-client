import { MessageFactory } from '../../application/message/MessageFactory';
import { PageableResourceCollectionFactory } from '../../kernel/resourceCollection/PageableResourceCollectionFactory';
import { Stream } from '../../kernel/streamApi/Stream';
import { Message } from '../domain/Message';
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
    private findLatestMessagesOutputPort: FindLatestMessagesOutputPort
  ) {}

  async execute(
    inputStream: Stream<MessageDto>,
    outputStream: Stream<Message>
  ): Promise<StreamingCacheableDataSource<Message>> {
    const messageMapper = (dto: MessageDto) => this.messageFactory.fromDto(dto);

    const inputMessageStream = inputStream.map(messageMapper);

    const latestMessagesCollection =
      await this.findLatestMessagesOutputPort.findLatestMessages();
    const resourceCollection = this.resourceCollectionFactory.createWithMapper(
      latestMessagesCollection,
      messageMapper
    );

    const latestMessages = latestMessagesCollection.getResources();
    const earliestDate = latestMessages[latestMessages.length - 1].createdAt;

    const getNextCollection = async () => {
      const collection =
        await this.findLatestMessagesOutputPort.findMessagesBeforeDate(
          earliestDate
        );
      return this.resourceCollectionFactory.createWithMapper(
        collection,
        messageMapper
      );
    };

    return new StreamingCacheableDataSource<Message>({
      resourceCollection,
      getNextCollection,
      newValueInputStream: inputMessageStream,
      newValueOutputStream: outputStream,
    });
  }
}
