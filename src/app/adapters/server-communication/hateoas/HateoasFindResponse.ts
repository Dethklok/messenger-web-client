import { PageMeta } from '../../../core/kernel/resourceCollection/PageMeta';

type Link = {
  href: string;
  templated?: boolean;
};

export type HateoasFindResponse<Entity> = {
  _embedded: {
    [key: string]: Entity[];
  };
  _links: {
    self: Link;
    prev?: Link;
    next?: Link;
  };
  page: PageMeta;
};
