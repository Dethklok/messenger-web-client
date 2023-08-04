import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChannelFactory } from 'app/side-menu/domain/ChannelFactory';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { SaveChannelAdapter } from '../../side-menu/adapter/SaveChannelAdapter';
import { SaveChannelInteractor } from '../../side-menu/interactor/SaveChannelInteractor';
import { SaveChannelInputPort } from '../../side-menu/port/SaveChannelInputPort';
import { SaveChannelOutputPort } from '../../side-menu/port/SaveChannelOutputPort';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatPageComponent } from './component/chat-page/chat-page.component';

@NgModule({
  declarations: [ChatPageComponent],
  providers: [
    ChannelFactory,
    {
      provide: SaveChannelOutputPort,
      useClass: SaveChannelAdapter,
    },
    {
      provide: SaveChannelInputPort,
      deps: [SaveChannelOutputPort, ChannelFactory],
      useFactory: (
        saveChannelOutputPort: SaveChannelOutputPort,
        channelFactory: ChannelFactory
      ) => new SaveChannelInteractor(saveChannelOutputPort, channelFactory),
    },
  ],
  imports: [CommonModule, ChatRoutingModule, NzLayoutModule],
})
export class ChatModule {}
