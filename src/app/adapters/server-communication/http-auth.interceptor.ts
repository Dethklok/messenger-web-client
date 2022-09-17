import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/adapters/auth/common/auth.service';
import { concatAll, map, Observable } from 'rxjs';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authService.getToken().pipe(
      map((token) =>
        request.clone({
          headers: request.headers.set('Authorization', `Bearer ${token}`),
        })
      ),
      map((requestWithAuthHeader) => next.handle(requestWithAuthHeader)),
      concatAll()
    );
  }
}
