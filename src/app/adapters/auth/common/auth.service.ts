import { Observable } from 'rxjs';

export abstract class AuthService {
  abstract getToken(): Observable<string>;
}
