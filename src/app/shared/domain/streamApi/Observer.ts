export interface Observer<T> {
  next(value: T): void;
}
