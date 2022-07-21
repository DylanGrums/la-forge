import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiHelperService {

  private _apiUrl: string = environment.apiUrl;

  constructor(
    private _http: HttpClient
  ) {
  }

  public get<T>(route: string, urlParams?: string): Observable<T | null> {
    const url: string = this.reconstituteUrl(route, urlParams);
    const obs: Observable<T | null> = this._http.get<T>(
      url,
      { observe: 'response' })
      .pipe(
        map((res: HttpResponse<T>) => res.body),
      );
    return obs;
  }

  public post<T>(route: string, body: any, urlParams?: string): Observable<T | null> {
    const url: string = this.reconstituteUrl(route, urlParams);
    const obs: Observable<T | null> = this._http.post<T>(
      url, body,
      { observe: 'response' })
      .pipe(
        map((res: HttpResponse<T>) => res.body as T),
      );
    return obs;
  }

  public put<T>(route: string, body: any, urlParams?: string): Observable<T | null> {
    const url: string = this.reconstituteUrl(route, urlParams);
    const obs: Observable<T | null> = this._http.put<T>(
      url,
      body,
      { observe: 'response' })
      .pipe(
        map((res: HttpResponse<T>) => res.body as T),
      );
    return obs;
  }

  public delete<T>(route: string, urlParams?: string): Observable<T | null> {
    const url: string = this.reconstituteUrl(route, urlParams);
    const obs: Observable<T | null> = this._http.delete<T>(
      url,
      { observe: 'response' })
      .pipe(
        map((res: HttpResponse<T>) => res.body),
      );
    return obs;
  }

  private reconstituteUrl(route: string, params?: string): string {
    let url: string = this._apiUrl + route;
    if (params) {
      url += params;
    }
    return url;
  }

}