import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '@models/StaticValues/GeneralStaticValues';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private baseUrl = AppConstants.API_BASE_URL;

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, headers?: any): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { headers: headers });
  }

  post<T>(endpoint: string, data: any, headers?: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, { headers: headers });
  }

  put<T>(endpoint: string, data: any, headers?: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data, { headers: headers });
  }

  delete<T>(endpoint: string, headers?: any): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, { headers: headers });
  }

}
