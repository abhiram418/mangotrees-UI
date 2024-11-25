import { Injectable } from '@angular/core';
import { AppConstants } from '@models/StaticValues/GeneralStaticValues';

@Injectable({
  providedIn: 'root'
})
export class CustomerAuthenticationService {

  constructor() { }

  TokenHandler(result:any){
    const token = result?.token;
    if (token) {
      sessionStorage.setItem(AppConstants.AUTH_TOKEN_KEY, token);
      localStorage.setItem(AppConstants.AUTH_TOKEN_KEY, token);
    } 
    else {
      alert(result?.message);
    }
  }
}
