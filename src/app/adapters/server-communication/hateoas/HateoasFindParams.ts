import { Search } from './Search';
import { Sort } from './Sort';

export type HateoasFindParams<T> = {
  page?: number;
  sort?: Sort<T>;
  search?: Search<T>;
};
