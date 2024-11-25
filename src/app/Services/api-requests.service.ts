import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestsService {

  constructor(private tokenService: AuthenticationService) { }

  sendRequest(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body: any = {}, customHeaders: any = {}) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Content-Length': JSON.stringify(body).length.toString(),
      ...customHeaders
    });
    const requestData = { endpoint, method, body, headers };
    return this.tokenService.addToken(requestData);
  }

}
