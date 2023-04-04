import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrimaryChatModule } from 'app/chat';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatPageComponent } from './chat-page/chat-page.component';

@NgModule({
  declarations: [ChatPageComponent],
  imports: [CommonModule, ChatRoutingModule, PrimaryChatModule, NzLayoutModule],
})
export class ChatModule {}
