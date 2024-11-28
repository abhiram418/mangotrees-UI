import { Injectable } from '@angular/core';
import { AppConstants } from '@models/StaticValues/GeneralStaticValues';

@Injectable({
  providedIn: 'root'
})
export class CustomerAuthenticationService {

  constructor() { }

  SaveToken(token:any){
    sessionStorage.setItem(AppConstants.AUTH_TOKEN_KEY, token);
    localStorage.setItem(AppConstants.AUTH_TOKEN_KEY, token);
  }

  GetToken(): string{
    const Token = sessionStorage.getItem(AppConstants.AUTH_TOKEN_KEY) ?? localStorage.getItem(AppConstants.AUTH_TOKEN_KEY) ?? "";
    return Token;
  }

  ClearToken(){
    sessionStorage.removeItem(AppConstants.AUTH_TOKEN_KEY);
    localStorage.removeItem(AppConstants.AUTH_TOKEN_KEY);
  }
  
}
