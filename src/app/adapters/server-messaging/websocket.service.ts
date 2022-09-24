import { Observable } from 'rxjs';

export abstract class WebsocketService {
  abstract publish<Body>(params: { destination: string; body: Body }): void;
  abstract watch<Body>(params: { destination: string }): Observable<Body>;
}
