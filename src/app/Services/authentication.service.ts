import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private apiService: ApiService) { }

  getToken(): string {
    return '';
  }

  addToken(requestData: { endpoint: string; method: string; body: any; headers: any }) {
    requestData.headers['Authorization'] = `Bearer ${this.getToken()}`;
    return this.handleRequest(requestData);
  }

  private handleRequest(requestData: { endpoint: string; method: string; body?: any; headers?: any }): Observable<any> {
    switch (requestData.method.toUpperCase()) {
      case 'GET':
        return this.apiService.get(requestData.endpoint);
      case 'POST':
        return this.apiService.post(requestData.endpoint, requestData.body);
      case 'PUT':
        return this.apiService.put(requestData.endpoint, requestData.body);
      case 'DELETE':
        return this.apiService.delete(requestData.endpoint);
      default:
        throw new Error('Unsupported request method');
    }
  }

}
