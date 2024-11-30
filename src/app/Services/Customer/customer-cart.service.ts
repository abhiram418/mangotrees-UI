import { Injectable } from '@angular/core';
import { AppConstants } from '@models/StaticValues/GeneralStaticValues';
import { ApiRequestsService } from '@services/api-requests.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerCartService {

  constructor(private apiRequests: ApiRequestsService) { }


  GetUserCartData(CartId:string){
    const endpoint = `Customer/Cart?cartId=${encodeURIComponent(CartId)}`;
    return this.apiRequests.sendRequest(endpoint, 'GET');
  }

  GetInventoryData(InventoryList:string[]){
    const endpoint = 'Product/Inventory';
    return this.apiRequests.sendRequest(endpoint, 'POST', InventoryList);
  }

  PostInventoryData(CartId:string, ProductId:string[]){
    const endpoint = `Customer/Cart?cartId=${encodeURIComponent(CartId)}`;
    return this.apiRequests.sendRequest(endpoint, 'POST', ProductId);
  }


  ///////////////////////////////////////////////////////////////////////////////////

  SetCartIdToStorage(cartId: string){
    try {
      sessionStorage.setItem(AppConstants.CART_KEY, cartId);
      localStorage.setItem(AppConstants.CART_KEY, cartId);
    } catch (error) {}
  }

  GetCartIdFromStorage(): string{
    try {
      const Token = sessionStorage.getItem(AppConstants.CART_KEY) ?? localStorage.getItem(AppConstants.AUTH_TOKEN_KEY) ?? "";
      return Token;
    } catch (error) {}
    return "";
  }

  ClearCartIdFromStorage(){
    try {
      sessionStorage.removeItem(AppConstants.CART_KEY);
      localStorage.removeItem(AppConstants.CART_KEY);
    } catch (error) {}
  }

}
