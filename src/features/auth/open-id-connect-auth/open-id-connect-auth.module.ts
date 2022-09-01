import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthGuard } from 'entities/auth/auth.guard';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { keycloakConfigurationFactory } from './keycloak-configuration.factory';
import { OpenIdConnectAuthGuard } from './open-id-connect-auth.guard';

@NgModule({
  declarations: [],
  imports: [KeycloakAngularModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: keycloakConfigurationFactory,
      deps: [KeycloakService],
      multi: true,
    },
    {
      provide: AuthGuard,
      useClass: OpenIdConnectAuthGuard,
    },
  ],
})
export class OpenIdConnectAuthModule {}
