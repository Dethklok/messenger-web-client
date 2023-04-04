import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../../domain/Message';
import { StreamingCacheableDataSource } from '../../domain/StreamingCacheableDataSource';
import { SaveMessageDto } from '../../dto/SaveMessageDto';
import { CreateMessageDataSourceInputPort } from '../../port/in/CreateMessageDataSourceInputPort';
import { SendMessageInputPort } from '../../port/in/SendMessageInputPort';

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
      new Subject()
    );
  }

  sendMessage(value: SaveMessageDto) {
    this.sendMessageInputPort.execute(value);
  }
}
