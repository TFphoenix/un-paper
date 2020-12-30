import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MonoTypeOperatorFunction, of, throwError } from 'rxjs';
import { concatMap, delay, retryWhen } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private readonly _maxRetries = 3;
  private readonly _msBetweenRetries = 2000;
  private readonly _defaultHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

  constructor(private readonly _http: HttpClient) {}

  get<T = any>(url: string, headers: HttpHeaders = this._defaultHeaders) {
    return this._http
      .get<T>(url, {
        headers: headers,
        reportProgress: true
      })
      .pipe(this.retryRequest<T>());
  }

  post<T = any>(url: string, body: any, headers: HttpHeaders = this._defaultHeaders) {
    return this._http
      .post<T>(url, body, {
        headers: headers,
        reportProgress: true
      })
      .pipe(this.retryRequest<T>());
  }

  put<T = any>(url: string, body: any, headers: HttpHeaders = this._defaultHeaders) {
    return this._http
      .put<T>(url, body, {
        headers: headers,
        reportProgress: true
      })
      .pipe(this.retryRequest<T>());
  }

  patch<T = any>(url: string, body: any, headers: HttpHeaders = this._defaultHeaders) {
    return this._http
      .post<T>(url, body, {
        headers: headers,
        reportProgress: true
      })
      .pipe(this.retryRequest<T>());
  }

  delete<T = any>(url: string, ids: string[] = [], headers: HttpHeaders = this._defaultHeaders) {
    if (ids.length > 1) {
      // many ids to delete
      return this._http
        .post<T>(`${url}:delete`, ids, {
          headers: headers,
          reportProgress: true
        })
        .pipe(this.retryRequest<T>());
    } else if (ids.length === 1) {
      // one id to delete and was provided in the ids param
      url = `${url}/${ids[0]}`;
    }

    return this._http
      .delete<T>(url, {
        headers: headers,
        reportProgress: true
      })
      .pipe(this.retryRequest<T>());
  }

  private retryRequest<T = any>(): MonoTypeOperatorFunction<T> {
    return retryWhen(errors =>
      errors.pipe(
        concatMap((error, count) => {
          // retry only when there is no answer from server or serve unavailable
          // also we don't retry more than max retries
          if (count < this._maxRetries && (error.status === 0 || error.status === 503)) {
            return of(error.status);
          }
          return throwError(error);
        }),
        delay(this._msBetweenRetries)
      )
    );
  }
}
