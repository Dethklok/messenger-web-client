import { Observable } from 'rxjs';

export abstract class AuthService {
  abstract getToken(): Observable<string>;

  abstract getAuthHeader(): Observable<{ name: string; value: string }>;
}
