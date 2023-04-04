import { map, Observable } from 'rxjs';
import { Subscribable } from '../domain/streamApi/Subscribable';

export class SubscribableRxAdapter<T> implements Subscribable<T> {
  constructor(private observable: Observable<T>) {}

  subscribe(onNext: (value: T) => void) {
    this.observable.subscribe(onNext);
  }

  map<R>(mapper: (value: T) => R): Subscribable<R> {
    return new SubscribableRxAdapter(this.observable.pipe(map(mapper)));
  }
}
