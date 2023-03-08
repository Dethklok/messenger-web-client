import { Sort } from './Sort';

export class UrlUtils {
  static createSortParams(sort: Sort) {
    return Object.entries(sort)
      .map(([sortProperty, sortOrder]) => `${sortProperty},${sortOrder}`)
      .join(',');
  }
}
