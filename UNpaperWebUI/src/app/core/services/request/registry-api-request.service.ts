import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { RequestMethods } from './request-methods.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistryApiRequestService implements RequestMethods {
  // headers
  private readonly _prodHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Ocp-Apim-Subscription-Key': environment.apimSubscriptionKey
  });
  private readonly _localHeaders: HttpHeaders = this._prodHeaders;

  // uri
  private readonly _baseUri = environment.services.registryApi;

  // ctor
  constructor(private readonly _requestService: RequestService) {}

  // methods
  get<T = any>(url: string, headers: HttpHeaders = this.getHeadersByEnvironment()): Observable<T> {
    return this._requestService.get(this.getUrl(url), headers);
  }
  post<T = any>(
    url: string,
    body: any,
    headers: HttpHeaders = this.getHeadersByEnvironment()
  ): Observable<T> {
    return this._requestService.post(this.getUrl(url), headers);
  }
  put<T = any>(
    url: string,
    body: any,
    headers: HttpHeaders = this.getHeadersByEnvironment()
  ): Observable<T> {
    return this._requestService.put(this.getUrl(url), body, headers);
  }
  patch<T = any>(
    url: string,
    body: any,
    headers: HttpHeaders = this.getHeadersByEnvironment()
  ): Observable<T> {
    return this._requestService.patch(this.getUrl(url), body, headers);
  }
  delete<T = any>(
    url: string,
    ids: string[],
    headers: HttpHeaders = this.getHeadersByEnvironment()
  ): Observable<T> {
    return this._requestService.delete(this.getUrl(url), ids, headers);
  }

  /**
   * @returns prefixed url
   */
  private getUrl(url: string): string {
    return this._baseUri + url;
  }

  /**
   * @returns http headers depending on the environment
   */
  private getHeadersByEnvironment(): HttpHeaders {
    return environment.production ? this._prodHeaders : this._localHeaders;
  }
}
