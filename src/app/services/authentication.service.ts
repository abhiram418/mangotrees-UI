import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { AppConstants } from '@models/StaticValues/GeneralStaticValues';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private apiService: ApiService) { }

  getToken(): string {
    const Token = sessionStorage.getItem(AppConstants.AUTH_TOKEN_KEY) ?? localStorage.getItem(AppConstants.AUTH_TOKEN_KEY) ?? "";
    
    return Token;
  }

  addToken(requestData: { endpoint: string; method: string; body: any; headers: any }) {
    requestData.headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);;
    return this.handleRequest(requestData);
  }

  private handleRequest(requestData: { endpoint: string; method: string; body?: any; headers?: any }): Observable<any> {
    switch (requestData.method.toUpperCase()) {
      case 'GET':
        return this.apiService.get(requestData.endpoint, requestData.headers);
      case 'POST':
        return this.apiService.post(requestData.endpoint, requestData.body, requestData.headers);
      case 'PUT':
        return this.apiService.put(requestData.endpoint, requestData.body, requestData.headers);
      case 'DELETE':
        return this.apiService.delete(requestData.endpoint, requestData.headers);
      default:
        throw new Error('Unsupported request method');
    }
  }

}
