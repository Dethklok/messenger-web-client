import { Sort } from './Sort';

export class UrlUtils {
  static createSortParams<T = unknown>(sort: Sort<T>) {
    return Object.entries(sort)
      .map(([sortProperty, sortOrder]) => `${sortProperty},${sortOrder}`)
      .join(',');
  }
}
