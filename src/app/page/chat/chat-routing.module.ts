import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatPageComponent } from 'app/page/chat/component/chat-page/chat-page.component';

const routes: Routes = [
  {
    path: '',
    component: ChatPageComponent,
    loadChildren: () =>
      import('app/chat/primary-chat.module').then((m) => m.PrimaryChatModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
