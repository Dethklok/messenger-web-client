import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthGuard } from 'app/auth/common/auth.guard';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AuthService } from '../common/auth.service';
import { keycloakConfigurationFactory } from './keycloak-configuration.factory';
import { OpenIdConnectAuthGuard } from './open-id-connect-auth.guard';
import { OpenIdConnectAuthService } from './open-id-connect-auth.service';

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
    {
      provide: AuthService,
      useClass: OpenIdConnectAuthService,
    },
  ],
})
export class OpenIdConnectAuthModule {}
