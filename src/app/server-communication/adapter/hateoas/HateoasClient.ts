import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { HateoasFindParams } from './HateoasFindParams';
import { HateoasFindResponse } from './HateoasFindResponse';
import { HateoasResourceCollection } from './HateoasResourceCollection';
import { Search } from './Search';
import { UrlUtils } from './UrlUtils';

@Injectable()
export class HateoasClient {
  private serverApiUri = environment.serverApiUri;

  constructor(private http: HttpClient) {}

  findAll<T extends object>(
    resourceName: string,
    params?: HateoasFindParams<T>
  ) {
    return this.http
      .get<HateoasFindResponse<T>>(
        this.createFindAllUrl(resourceName, params?.search),
        {
          params: params ? this.createFindAllParams<T>(params) : undefined,
        }
      )
      .pipe(
        map(
          (response) =>
            new HateoasResourceCollection<T>(resourceName, response, this.http)
        )
      );
  }

  save<TResource, TBody = unknown>(
    resourceName: string,
    body: TBody
  ): Observable<TResource> {
    return this.http.post<TResource>(this.getResourceUrl(resourceName), body);
  }

  private createFindAllParams<T extends object>({
    page,
    sort,
    search,
  }: HateoasFindParams<T>) {
    let params = new HttpParams({ fromObject: { size: 5 } });

    if (page) params = params.set('page', page);
    if (sort) params = params.set('sort', UrlUtils.createSortParams(sort));
    if (search) params = params.set(search.key.toString(), search.value);

    return params;
  }

  private getResourceUrl(resourceName: string): string {
    return `${this.serverApiUri}/${resourceName}`;
  }

  private createFindAllUrl<T>(resourceName: string, search?: Search<T>) {
    const url = this.getResourceUrl(resourceName);

    if (search) {
      return `${url}/search/${search.rel}`;
    }

    return url;
  }
}
