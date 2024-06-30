import { Injectable } from '@angular/core';
import { ResetPasswordData } from '../Models/ResetPasswordData';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  OTP:number = null!;
  PasswordData:ResetPasswordData = null!;

  constructor() { }

  UserValidity(PhoneNumber:string){
    //check is the PhoneNumber is available
    // And post Customer Number to get the otp
    this.OTP = 111111; // assine the otp
    return(this.OTP);
  }

  GetOTP(){
    return(this.OTP);
  }

  GetPasswordData(){
    return(this.PasswordData);
  }

  StorePasswordData(Data:any){
    if(Data){
      this.PasswordData = new ResetPasswordData();
      this.PasswordData.PhoneNumber = Data.PhoneNumber;
      this.PasswordData.Password = Data.Password;
    }
  }

  ClearAll(){
    this.PasswordData = null!;
    this.OTP = null!;
  }

  PostPasswordData(){
    if(this.PasswordData != null){
      // post the Customer's new Password Data
      console.log(this.PasswordData);
      return(true); // if sucessfuly posted
    }
    else{
      return(false);
    }
  }
}
