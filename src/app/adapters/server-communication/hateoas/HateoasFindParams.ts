import { Search } from './Search';
import { Sort } from './Sort';

export type HateoasFindParams = {
  page?: number;
  sort?: Sort;
  search?: Search;
};
