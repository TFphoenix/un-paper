import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestMethods } from './request-methods.interface';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class FunctionsApiRequestService implements RequestMethods {
  // headers
  private readonly _prodHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Ocp-Apim-Subscription-Key': environment.apimSubscriptionKey
  });
  private readonly _localHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Ocp-Apim-Subscription-Key': environment.apimSubscriptionKey
  });

  // uri
  private readonly _baseUri = environment.services.functionsApi;

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
    return this._requestService.post(this.getUrl(url), body, headers);
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
    id: string,
    headers: HttpHeaders = this.getHeadersByEnvironment()
  ): Observable<T> {
    return this._requestService.delete(this.getUrl(url), id, headers);
  }
  deleteByBody<T = any>(
    url: string,
    body: any,
    headers: HttpHeaders = this.getHeadersByEnvironment()
  ): Observable<T> {
    return this._requestService.deleteByBody(this.getUrl(url), body, headers);
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
    const headers = environment.production ? this._prodHeaders : this._localHeaders;
    // headers.set('Authorization', `Bearer ${}`)
    return headers;
  }
}
