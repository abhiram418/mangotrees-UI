import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestsService {

  constructor(private tokenService: AuthenticationService) { }

  sendRequest(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body: any = {}, customHeaders: any = {}) {
    const headers = { 'Content-Type': 'application/json', ...customHeaders };
    const requestData = { endpoint, method, body, headers };
    return this.tokenService.addToken(requestData);
  }

}
