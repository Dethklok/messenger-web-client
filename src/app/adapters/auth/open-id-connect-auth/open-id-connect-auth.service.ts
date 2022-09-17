import { Injectable } from '@angular/core';
import { AuthService } from 'app/adapters/auth/common/auth.service';
import { KeycloakService } from 'keycloak-angular';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenIdConnectAuthService implements AuthService {
  constructor(private readonly keycloakService: KeycloakService) {}

  getToken(): Observable<string> {
    return from(this.keycloakService.getToken());
  }
}
