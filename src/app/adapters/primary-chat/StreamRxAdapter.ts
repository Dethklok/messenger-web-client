import { Subject } from 'rxjs';
import { Stream } from '../../core/kernel/streamApi/Stream';
import { SubscribableRxAdapter } from './SubscribableRxAdapter';

export class StreamRxAdapter<T>
  extends SubscribableRxAdapter<T>
  implements Stream<T>
{
  constructor(private subject: Subject<T>) {
    super(subject);
  }

  next(value: T) {
    this.subject.next(value);
  }
}
