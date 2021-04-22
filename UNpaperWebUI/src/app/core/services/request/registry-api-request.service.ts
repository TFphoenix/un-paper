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
  private readonly _baseHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Ocp-Apim-Subscription-Key': environment.apimSubscriptionKey
  });

  // uri
  private readonly _baseUri = environment.services.registryApi;

  // ctor
  constructor(private readonly _requestService: RequestService) {}

  // methods
  get<T = any>(url: string, headers: HttpHeaders = this.getHeaders()): Observable<T> {
    return this._requestService.get(this.getUrl(url), headers);
  }
  post<T = any>(url: string, body: any, headers: HttpHeaders = this.getHeaders()): Observable<T> {
    return this._requestService.post(this.getUrl(url), body, headers);
  }
  put<T = any>(url: string, body: any, headers: HttpHeaders = this.getHeaders()): Observable<T> {
    return this._requestService.put(this.getUrl(url), body, headers);
  }
  patch<T = any>(url: string, body: any, headers: HttpHeaders = this.getHeaders()): Observable<T> {
    return this._requestService.patch(this.getUrl(url), body, headers);
  }
  delete<T = any>(
    url: string,
    id: string,
    headers: HttpHeaders = this.getHeaders()
  ): Observable<T> {
    return this._requestService.delete(this.getUrl(url), id, headers);
  }

  /**
   * @returns prefixed url
   */
  private getUrl(url: string): string {
    return this._baseUri + url;
  }

  /**
   * @returns http headers
   */
  private getHeaders(): HttpHeaders {
    return this._baseHeaders;
  }
}
