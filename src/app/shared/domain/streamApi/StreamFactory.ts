import { Stream } from './Stream';

export abstract class StreamFactory {
  abstract createStream<T>(): Stream<T>;
}
