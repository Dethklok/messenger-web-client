import { KeycloakService } from 'keycloak-angular';
import { environment } from 'environments/environment';

export const keycloakConfigurationFactory = (service: KeycloakService) => {
  const { uri, realm, clientId } = environment.auth;

  return () =>
    service.init({
      config: {
        url: uri,
        realm,
        clientId,
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: `${window.location.origin}/assets/silent-check-sso.html`,
      },
    });
};
