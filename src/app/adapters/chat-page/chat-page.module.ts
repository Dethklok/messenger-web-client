import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrimaryChatModule } from 'app/adapters/primary-chat';
import { ChatPageRoutingModule } from './chat-page-routing.module';
import { ChatPageComponent } from './chat-page/chat-page.component';

@NgModule({
  declarations: [ChatPageComponent],
  imports: [CommonModule, ChatPageRoutingModule, PrimaryChatModule],
})
export class ChatPageModule {}
