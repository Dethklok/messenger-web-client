import { Injectable } from '@angular/core';
import { AuthService } from 'app/auth/common/auth.service';
import { KeycloakService } from 'keycloak-angular';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenIdConnectAuthService implements AuthService {
  private HEADER_NAME = 'Authorization';
  private TOKEN_PREFIX = 'Bearer ';

  constructor(private readonly keycloakService: KeycloakService) {}

  getToken(): Observable<string> {
    return from(this.keycloakService.getToken());
  }

  getAuthHeader(): Observable<{ name: string; value: string }> {
    return this.getToken().pipe(
      map((token) => ({
        name: this.HEADER_NAME,
        value: `${this.TOKEN_PREFIX}${token}`,
      }))
    );
  }
}
