import { MessageStore } from 'app/core/application/port/MessageStore';
import { AsyncUseCase } from 'app/core/application/useCase/AsyncUseCase';
import { CollectionMapper } from 'app/core/kernel/CollectionMapper';
import { MessageRepository } from '../port/MessageRepository';

export class LoadMessagesToStoreUseCase implements AsyncUseCase<void> {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly messageStore: MessageStore
  ) {}

  async execute(): Promise<void> {
    const messages = await this.messageRepository.findAll();
    this.messageStore.saveAll(
      CollectionMapper.mapArrayToMap(messages, ({ id }) => id)
    );
  }
}
