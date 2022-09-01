import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  OpenIdConnectAuthGuard,
  OpenIdConnectAuthModule,
} from 'features/auth/open-id-connect-auth';

const routes: Routes = [
  {
    path: 'chat',
    loadChildren: () =>
      import('pages/chat/chat.module').then((m) => m.ChatModule),
    canActivate: [OpenIdConnectAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), OpenIdConnectAuthModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
