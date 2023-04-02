import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../../../../core/messaging/domain/Message';
import { StreamingCacheableDataSource } from '../../../../core/messaging/domain/StreamingCacheableDataSource';
import { SaveMessageDto } from '../../../../core/messaging/dto/SaveMessageDto';
import { CreateMessageDataSourceInputPort } from '../../../../core/messaging/port/in/CreateMessageDataSourceInputPort';
import { SendMessageInputPort } from '../../../../core/messaging/port/in/SendMessageInputPort';
import { SubscribableRxAdapter } from '../../SubscribableRxAdapter';

@Component({
  selector: 'app-primary-chat',
  templateUrl: './primary-chat.component.html',
})
export class PrimaryChatComponent implements OnInit {
  dataSource: StreamingCacheableDataSource<Message> | null = null;

  constructor(
    private readonly sendMessageInputPort: SendMessageInputPort,
    private readonly createMessageDataSourceInputPort: CreateMessageDataSourceInputPort
  ) {}

  async ngOnInit() {
    this.dataSource = await this.createMessageDataSourceInputPort.execute(
      new SubscribableRxAdapter(new Subject()),
      new Subject()
    );
  }

  sendMessage(value: SaveMessageDto) {
    this.sendMessageInputPort.execute(value);
  }
}
