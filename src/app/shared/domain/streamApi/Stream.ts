import { Observer } from './Observer';
import { Subscribable } from './Subscribable';

export interface Stream<T> extends Subscribable<T>, Observer<T> {}
