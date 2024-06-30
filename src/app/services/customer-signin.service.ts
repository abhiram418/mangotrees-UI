import { Injectable } from '@angular/core';
import { CustomerProfileData } from '../Models/CustomerProfileData';

@Injectable({
  providedIn: 'root'
})
export class CustomerSigninService {
  CustomerData:CustomerProfileData = null!;
  OTP:number = null!;

  constructor() { }

  UserNameAvailability(UserName:string){
    //check is the username is available
    return(true);
  }

  PhoneNumberAvailability(phoneNumber:number){
    // post Customer Number and get the otp
    this.OTP = 123456; // assine the otp
    return(this.OTP);
  }

  GetOTP(){
    return(this.OTP);
  }

  GetUserData(){
    return(this.CustomerData);
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
      console.log(this.CustomerData);
      return(true); // if sucessfuly posted
    }
    else{
      return(false);
    }
  }
}
