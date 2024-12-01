import { Injectable } from '@angular/core';
import { CustomerDetailsApiData } from '@models/ApiModels/CustomerData';
import { AppConstants } from '@models/StaticValues/GeneralStaticValues';
import { CustomerSigninService } from './customer-signin.service';
import { AddressDesc } from '@models/CustomerProfileData';
import { NavBarService } from '@services/General/nav-bar.service';
import { CustomerCartService } from './customer-cart.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerAuthenticationService {
  CustomerData!:CustomerDetailsApiData;
  private CustomerDataSubject = new BehaviorSubject<CustomerDetailsApiData | null>(null);
  CustomerData$ = this.CustomerDataSubject.asObservable()

  constructor(private customerCartService: CustomerCartService, private customerSigninService: CustomerSigninService, private navBarService: NavBarService) {
    this.RetrieveCustomerData();
  }

  SaveToken(token:any){
    try {
      sessionStorage.setItem(AppConstants.AUTH_TOKEN_KEY, token);
      localStorage.setItem(AppConstants.AUTH_TOKEN_KEY, token);
    } catch (error) {}
  }

  GetToken(): string{
    try {
      const Token = sessionStorage.getItem(AppConstants.AUTH_TOKEN_KEY) ?? localStorage.getItem(AppConstants.AUTH_TOKEN_KEY) ?? "";
      return Token;
    } catch (error) {}
    return "";
  }

  ClearToken(){
    try {
      sessionStorage.removeItem(AppConstants.AUTH_TOKEN_KEY);
      localStorage.removeItem(AppConstants.AUTH_TOKEN_KEY);
    } catch (error) {}
  }


  ///////////////////////////////////////////////////////////

  SaveUserData(userData: CustomerDetailsApiData){
    this.CustomerData = userData;
  }

  GetUserData(): CustomerDetailsApiData{
    return this.CustomerData;
  }

  ClearUserData(){
    this.CustomerData = null!;
  }


  ////////////////////////////////////////////////////////////


  RetrieveCustomerData(){
    this.customerSigninService.GetUserData().subscribe(
      result =>{
        this.StoreUserData(result);
        this.navBarService.StoreUserData(result);
        this.customerCartService.SetCartIdToStorage(result.cart);
        this.navBarService.GetCartCount(result.cart);
      },
      error =>{
        if(error.status == 401){
          this.ClearToken();
        }
      }
    );
  }

  StoreUserData(Data:any){
    this.CustomerData = new CustomerDetailsApiData();

    this.CustomerData.FirstName = Data.firstName;
    this.CustomerData.LastName = Data.lastName;
    this.CustomerData.Gender = Data.gender;
    this.CustomerData.DateOfBirth = Data.dateOfBirth;
    this.CustomerData.PhoneNumber = Data.phoneNumber;
    this.CustomerData.Email = Data?.email;
    this.CustomerData.Occupation = Data.occupation;
    this.CustomerData.AddressList = [];
    this.CustomerData.Cart = Data.cart;
    
    for (let index = 0; index < Data.addressList.length; index++) {
      this.CustomerData.AddressList[index] = new AddressDesc();
      this.CustomerData.AddressList[index].AddressID = Data.addressList[index].addressID;
      this.CustomerData.AddressList[index].AddressTitle = Data.addressList[index].addressTitle;
      this.CustomerData.AddressList[index].Address = Data.addressList[index].address;
      this.CustomerData.AddressList[index].City = Data.addressList[index].city;      
      this.CustomerData.AddressList[index].State = Data.addressList[index].state;
      this.CustomerData.AddressList[index].Pincode = Data.addressList[index].pincode;
      this.CustomerData.AddressList[index].IsEditable = Data.addressList[index].isEditable;
      this.CustomerData.AddressList[index].IsDeleteable = Data.addressList[index].isDeleteable;
      this.CustomerData.AddressList[index].IsPrimary = Data.addressList[index].isPrimary;
    }
    this.CustomerDataSubject.next(this.CustomerData);
  }

  GetCustomerData(): Observable<CustomerDetailsApiData | null> {
    return this.CustomerData$;
  }
  
}
