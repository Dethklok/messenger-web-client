import { AsyncUseCase } from 'app/core/application/common/AsyncUseCase';
import { FindAllMessagesOutputPort } from 'app/core/application/message/port/FindAllMessagesOutputPort';
import { SaveAllMessagesOutputPort } from 'app/core/application/message/port/SaveAllMessagesOutputPort';
import { CollectionMapper } from 'app/core/kernel/CollectionMapper';

export class LoadMessagesToStoreUseCase implements AsyncUseCase<void> {
  constructor(
    private readonly messageRepository: FindAllMessagesOutputPort,
    private readonly saveAllMessagesPort: SaveAllMessagesOutputPort
  ) {}

  async execute(): Promise<void> {
    const messages = await this.messageRepository.findAll();

    this.saveAllMessagesPort.saveAll(
      CollectionMapper.mapArrayToMap(messages, ({ id }) => id)
    );
  }
}
