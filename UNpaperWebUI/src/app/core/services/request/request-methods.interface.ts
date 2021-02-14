import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RequestMethods {
  get<T = any>(url: string, headers: HttpHeaders): Observable<T>;
  post<T = any>(url: string, body: any, headers: HttpHeaders): Observable<T>;
  put<T = any>(url: string, body: any, headers: HttpHeaders): Observable<T>;
  patch<T = any>(url: string, body: any, headers: HttpHeaders): Observable<T>;
  delete<T = any>(url: string, ids: string[], headers: HttpHeaders): Observable<T>;
}
