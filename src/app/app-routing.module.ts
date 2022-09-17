import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/adapters/auth/common/auth.guard';

const routes: Routes = [
  {
    path: 'chat',
    loadChildren: () =>
      import('app/adapters/chat-page/chat-page.module').then(
        (m) => m.ChatPageModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
