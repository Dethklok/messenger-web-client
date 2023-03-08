import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { HateoasFindResponse } from './HateoasFindResponse';

export class ResourceCollection<Resource> {
  constructor(
    private resourceName: string,
    private response: HateoasFindResponse<Resource>,
    private http: HttpClient
  ) {}

  get resources(): Resource[] {
    const result = [];

    for (const resources of Object.values(this.response._embedded)) {
      result.push(...resources);
    }

    return result;
  }

  get page() {
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

    return this.http
      .get<HateoasFindResponse<Resource>>(this.response._links.next!.href)
      .pipe(
        map(
          (response) =>
            new ResourceCollection(this.resourceName, response, this.http)
        )
      );
  }

  getPrevPage() {
    if (!this.hasPrevPage()) {
      throw new Error('Collection dont have the prev page');
    }

    return this.http
      .get<HateoasFindResponse<Resource>>(this.response._links.prev!.href)
      .pipe(
        map(
          (response) =>
            new ResourceCollection(this.resourceName, response, this.http)
        )
      );
  }
}
