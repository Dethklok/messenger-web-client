export interface Subscribable<T> {
  subscribe(onNext: (value: T) => void): void;
  map<R>(mapper: (value: T) => R): Subscribable<R>;
}
