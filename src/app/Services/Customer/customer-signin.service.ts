import { Injectable } from '@angular/core';
import { LoginRequestModel, ResetPasswordModel, UserRequestModel } from '@models/CustomerData';
import { AddressDesc, CustomerProfileData } from '@models/CustomerProfileData';
import { ApiRequestsService } from '@services/api-requests.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerSigninService {
  CustomerData:CustomerProfileData = null!;
  OTP:number = null!;

  constructor(private apiRequests: ApiRequestsService) { }

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

  GetUserData(){
    const endpoint = '/Customer';
    return this.apiRequests.sendRequest(endpoint, 'GET');
  }

  StoreUserData(Data:any){
    if(Data){
      this.CustomerData = new CustomerProfileData();
      this.CustomerData.FirstName = Data.FirstName;
      this.CustomerData.LastName = Data.LastName;
      this.CustomerData.PhoneNumber = Data.PhoneNumber;
      this.CustomerData.Email = Data.Email;
      this.CustomerData.UserName = Data.UserName;
      this.CustomerData.Password = Data.Password;
      this.CustomerData.AddressList[0]=Data.AddressDesc;
      this.CustomerData.Occupation = Data.Occupation;
      this.CustomerData.Conditions = Data.Conditions;
    }

  }

  ClearAll(){
    this.CustomerData = null!;
    this.OTP = null!;
  }

  PostUserData(){
    if(this.CustomerData != null){
      // post the Customer Data
      return(true); // if sucessfuly posted
    }
    else{
      return(false);
    }
  }
}
