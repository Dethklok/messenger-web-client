import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/auth/common/auth.guard';

const routes: Routes = [
  {
    path: 'chat',
    loadChildren: () =>
      import('app/page/chat/chat.module').then((m) => m.ChatModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
