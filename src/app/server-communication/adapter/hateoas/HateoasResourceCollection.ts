import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { PageableResourceCollection } from '../../domain/PageableResourceCollection';
import { HateoasFindResponse } from './HateoasFindResponse';

export class HateoasResourceCollection<Resource>
  implements PageableResourceCollection<Resource>
{
  constructor(
    private resourceName: string,
    private response: HateoasFindResponse<Resource>,
    private http: HttpClient
  ) {}

  getResources(): Resource[] {
    const result = [];

    for (const resources of Object.values(this.response._embedded)) {
      result.push(...resources);
    }

    return result;
  }

  getPageMeta() {
    return this.response.page;
  }

  hasNextPage() {
    return Boolean(this.response._links.next?.href.length);
  }

  hasPrevPage() {
    return Boolean(this.response._links.prev?.href.length);
  }

  getNextPage() {
    if (!this.hasNextPage()) {
      throw new Error('Collection dont have the next page');
    }

    return firstValueFrom(
      this.http
        .get<HateoasFindResponse<Resource>>(this.response._links.next!.href)
        .pipe(
          map(
            (response) =>
              new HateoasResourceCollection(
                this.resourceName,
                response,
                this.http
              )
          )
        )
    );
  }

  getPrevPage() {
    if (!this.hasPrevPage()) {
      throw new Error('Collection dont have the prev page');
    }

    return firstValueFrom(
      this.http
        .get<HateoasFindResponse<Resource>>(this.response._links.prev!.href)
        .pipe(
          map(
            (response) =>
              new HateoasResourceCollection(
                this.resourceName,
                response,
                this.http
              )
          )
        )
    );
  }
}
