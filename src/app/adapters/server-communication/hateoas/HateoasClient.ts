import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HateoasFindParams } from './HateoasFindParams';
import { HateoasFindResponse } from './HateoasFindResponse';
import { ResourceCollection } from './ResourceCollection';
import { Search } from './Search';
import { UrlUtils } from './UrlUtils';

@Injectable()
export class HateoasClient {
  private serverApiUri = environment.serverApiUri;

  constructor(private http: HttpClient) {}

  findAll<T>(resourceName: string, params?: HateoasFindParams) {
    return this.http
      .get<HateoasFindResponse<T>>(
        this.createFindAllUrl(resourceName, params?.search),
        {
          params: params ? this.createFindAllParams(params) : undefined,
        }
      )
      .pipe(
        map(
          (response) =>
            new ResourceCollection<T>(resourceName, response, this.http)
        )
      );
  }

  private createFindAllParams({ page, sort, search }: HateoasFindParams) {
    let params = new HttpParams({ fromObject: { size: 5 } });

    if (page) params = params.set('page', page);
    if (sort) params = params.set('sort', UrlUtils.createSortParams(sort));
    if (search) params = params.set(search.key, search.value);

    return params;
  }

  private createFindAllUrl(resourceName: string, search?: Search) {
    const url = `${this.serverApiUri}/${resourceName}`;

    if (search) {
      return `${url}/search/${search.rel}`;
    }

    return url;
  }
}
