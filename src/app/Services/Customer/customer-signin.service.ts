import { Injectable } from '@angular/core';
import { LoginRequestModel, ResetPasswordModel, UserRequestModel } from '@models/CustomerData';
import { ApiRequestsService } from '@services/api-requests.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerSigninService {

  constructor(private apiRequests: ApiRequestsService) { }

  GetUserData(){
    const endpoint = '/Customer';
    return this.apiRequests.sendRequest(endpoint, 'GET');
  }

  UserNameAvailability(UserName:string){
    const endpoint = `Authentication/UserName?userName=${encodeURIComponent(UserName)}`;
    return this.apiRequests.sendRequest(endpoint, 'GET');
  }

  UserLogin(UserLoginData: LoginRequestModel){
    const endpoint = 'Authentication/Login';
    return this.apiRequests.sendRequest(endpoint, 'POST', UserLoginData);
  }

  RequestOTP(phoneNumber:number){
    const endpoint = `Authentication/Request/OTP?phoneNumber=${encodeURIComponent(phoneNumber)}`;
    return this.apiRequests.sendRequest(endpoint, 'POST');
  }

  SignupCustomer(customerData: UserRequestModel, OTP:string){
    const endpoint = `Authentication/Signup?otp=${encodeURIComponent(OTP)}`;
    return this.apiRequests.sendRequest(endpoint, 'POST', customerData);
  }

  ResetCustomerPasswordRequest(phoneNumber:number){
    const endpoint = `Authentication/Password/Request/OTP?phoneNumber=${encodeURIComponent(phoneNumber)}`;
    return this.apiRequests.sendRequest(endpoint, 'POST');
  }

  ResetCustomerPassword(resetPasswordModel:ResetPasswordModel){
    const endpoint = 'Authentication/Password';
    return this.apiRequests.sendRequest(endpoint, 'POST', resetPasswordModel);
  }
///////////////////////



//////////////////////

  Test(){
    const endpoint = '';
    return this.apiRequests.sendRequest(endpoint, 'GET');
  }


  // PostUserData(){
  //   if(this.CustomerData != null){
  //     // post the Customer Data
  //     return(true); // if sucessfuly posted
  //   }
  //   else{
  //     return(false);
  //   }
  // }
}
