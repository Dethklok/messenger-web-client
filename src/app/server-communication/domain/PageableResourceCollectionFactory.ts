import { PageableResourceCollection } from './PageableResourceCollection';
import { PageMeta } from './PageMeta';

export class PageableResourceCollectionFactory {
  createWithMapper<T, R>(
    collection: PageableResourceCollection<T>,
    mapper: (value: T) => R
  ): PageableResourceCollection<R> {
    return new WithMapperCollectionProxy(collection, mapper);
  }
}

class WithMapperCollectionProxy<T, R> implements PageableResourceCollection<R> {
  constructor(
    private sourceCollection: PageableResourceCollection<T>,
    private mapper: (value: T) => R
  ) {}

  getResources(): R[] {
    return this.sourceCollection.getResources().map(this.mapper);
  }

  async getNextPage(): Promise<PageableResourceCollection<R> | undefined> {
    const nextCollection = await this.sourceCollection.getNextPage();
    return nextCollection
      ? new WithMapperCollectionProxy(nextCollection, this.mapper)
      : undefined;
  }

  async getPrevPage(): Promise<PageableResourceCollection<R> | undefined> {
    const prevCollection = await this.sourceCollection.getPrevPage();
    return prevCollection
      ? new WithMapperCollectionProxy(prevCollection, this.mapper)
      : undefined;
  }

  hasNextPage(): boolean {
    return this.sourceCollection.hasNextPage();
  }

  hasPrevPage(): boolean {
    return this.sourceCollection.hasPrevPage();
  }

  getPageMeta(): PageMeta {
    return this.sourceCollection.getPageMeta();
  }
}
