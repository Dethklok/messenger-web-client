import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OpenIdConnectAuthModule } from 'app/adapters/auth/open-id-connect-auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, OpenIdConnectAuthModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
