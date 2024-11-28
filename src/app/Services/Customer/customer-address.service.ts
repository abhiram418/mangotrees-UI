import { Injectable } from '@angular/core';
import { AddressDesc } from '@models/CustomerProfileData';
import { ApiRequestsService } from '@services/api-requests.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerAddressService {

  constructor(private apiRequests: ApiRequestsService) { }

  GetCustomerAddresses(){
    const endpoint = 'Customer/Addresses';
    return this.apiRequests.sendRequest(endpoint, 'GET');
  }
  
  PostCustomerAddress(Address:AddressDesc){
    const endpoint = 'Customer/Address';
    return this.apiRequests.sendRequest(endpoint, 'POST', Address);
  }
  
  UpdateCustomerAddress(Address:AddressDesc){
    const endpoint = `Customer/UpdateAddress?addressId=${encodeURIComponent(Address.AddressID!)}`;
    return this.apiRequests.sendRequest(endpoint, 'POST', Address);
  }
  
  DeteleCustomerAddress(AddressID: string){
    const endpoint = `Customer/Address?addressId=${AddressID}`;
    return this.apiRequests.sendRequest(endpoint, 'DELETE');
  }

}
