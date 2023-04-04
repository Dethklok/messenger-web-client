import { PageMeta } from './PageMeta';

export abstract class PageableResourceCollection<T> {
  abstract getResources(): T[];
  abstract hasNextPage(): boolean;
  abstract getNextPage(): Promise<PageableResourceCollection<T> | undefined>;
  abstract hasPrevPage(): boolean;
  abstract getPrevPage(): Promise<PageableResourceCollection<T> | undefined>;
  abstract getPageMeta(): PageMeta;
}
