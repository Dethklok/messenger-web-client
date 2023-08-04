import { Observable } from 'rxjs';
import { InfiniteScrollableListDataSourceOptions } from './InfiniteScrollableListDataSourceOptions';

export interface InfiniteScrollableListDataSource<T> {
  loadItems(index: number, count: number): Observable<T[]>;
  onPush$: Observable<T[]>;
  initialize(): Observable<InfiniteScrollableListDataSourceOptions>;
  readonly lastIndex: number;
}
