import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiConfig } from 'src/app/configs/b2c-config';
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
    'Ocp-Apim-Subscription-Key': apiConfig.apimSubscriptionKey
  });
  private readonly _localHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  });

  // api prefix
  private readonly _apiPrefix = '/api';

  // ctor
  constructor(private readonly _requestService: RequestService) {}

  // methods
  get<T = any>(url: string, headers: HttpHeaders = this.getHeadersByEnvironment()): Observable<T> {
    return this._requestService.get(apiConfig.uri + this._apiPrefix + url, headers);
  }
  post<T = any>(url: string, body: any, headers: HttpHeaders = this.getHeadersByEnvironment()): Observable<T> {
    return this._requestService.post(apiConfig.uri + this._apiPrefix + url, body, headers);
  }
  put<T = any>(url: string, body: any, headers: HttpHeaders = this.getHeadersByEnvironment()): Observable<T> {
    return this._requestService.put(apiConfig.uri + this._apiPrefix + url, body, headers);
  }
  patch<T = any>(url: string, body: any, headers: HttpHeaders = this.getHeadersByEnvironment()): Observable<T> {
    return this._requestService.patch(apiConfig.uri + this._apiPrefix + url, body, headers);
  }
  delete<T = any>(url: string, ids: string[], headers: HttpHeaders = this.getHeadersByEnvironment()): Observable<T> {
    return this._requestService.delete(apiConfig.uri + this._apiPrefix + url, ids, headers);
  }

  // returns http headers depending on the environment
  private getHeadersByEnvironment(): HttpHeaders {
    return environment.production ? this._prodHeaders : this._localHeaders;
  }
}
