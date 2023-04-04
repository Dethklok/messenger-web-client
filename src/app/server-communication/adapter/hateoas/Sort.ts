import { SortOrder } from './SortOrder';

export type Sort<T> = {
  [key in keyof T]?: SortOrder;
};
