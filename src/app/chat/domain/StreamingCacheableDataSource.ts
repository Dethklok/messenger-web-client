import { PageableResourceCollection } from 'app/server-communication/domain/PageableResourceCollection';
import { Stream } from 'app/shared/domain/streamApi/Stream';
import { Subscribable } from 'app/shared/domain/streamApi/Subscribable';

type Configuration<Value> = {
  newValueInputStream: Subscribable<Value>;
  newValueOutputStream: Stream<Value>;
  resourceCollection: PageableResourceCollection<Value>;
  getNextCollection?: () => Promise<PageableResourceCollection<Value>>;
};

export class StreamingCacheableDataSource<Value> {
  private cache = new Map<number, Value>();
  private resourceCollection: PageableResourceCollection<Value>;
  private getNextCollection?: () => Promise<
    PageableResourceCollection<Value> | undefined
  >;
  lastIndex = -1;
  newValueOutputStream: Stream<Value>;

  constructor({
    newValueInputStream,
    newValueOutputStream,
    resourceCollection,
    getNextCollection,
  }: Configuration<Value>) {
    this.resourceCollection = resourceCollection;
    this.getNextCollection = getNextCollection;
    this.addValuesToCache(
      resourceCollection.getResources(),
      resourceCollection.getPageMeta().totalElements - 1
    );
    this.newValueOutputStream = newValueOutputStream;

    newValueInputStream.subscribe((value) => this.processNewValue(value));
  }

  async getItems(indexFrom: number, count: number): Promise<Value[]> {
    if (this.isValuesCached(indexFrom, count)) {
      return this.getFromCache(indexFrom, count);
    }

    const nextResourceCollection = await this.getNextCollection?.();

    if (!nextResourceCollection) {
      return [];
    }

    this.getNextCollection = () => nextResourceCollection.getNextPage();

    const { totalElements, number, size } =
      nextResourceCollection.getPageMeta();

    this.addValuesToCache(
      nextResourceCollection.getResources(),
      totalElements - number * size - 1
    );

    return this.getFromCache(indexFrom, count);
  }

  private processNewValue(value: Value) {
    this.addValueToCache(value, this.lastIndex + 1);
    this.newValueOutputStream.next(value);
  }

  private isValuesCached(index: number, count: number): boolean {
    if (index + count > this.lastIndex) return true;
    return this.cache.has(index) && this.cache.has(index + count);
  }

  private getFromCache(index: number, count: number) {
    const result = [];

    for (let i = index; i < index + count; i++) {
      const value = this.cache.get(i);
      if (value) {
        result.push(value);
      }
    }

    return result;
  }

  private addValuesToCache(values: Value[], startIndex: number) {
    values.forEach((value, index) =>
      this.addValueToCache(value, startIndex - index)
    );
  }

  private addValueToCache(value: Value, index: number) {
    this.cache.set(index, value);
    if (index > this.lastIndex) {
      this.lastIndex = index;
    }
  }
}
