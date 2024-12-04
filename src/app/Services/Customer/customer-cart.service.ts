import { Injectable } from '@angular/core';
import { AppConstants } from '@models/StaticValues/GeneralStaticValues';
import { ApiRequestsService } from '@services/api-requests.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerCartService {
  greenSignalToGetCartData: boolean = false;
  
  constructor(private apiRequests: ApiRequestsService) { }


  GetUserCartData(CartId:string){
    const endpoint = `Customer/Cart?cartId=${encodeURIComponent(CartId)}`;
    return this.apiRequests.sendRequest(endpoint, 'GET');
  }

  GetInventoryData(InventoryList:string[]){
    const endpoint = 'Product/Inventory';
    return this.apiRequests.sendRequest(endpoint, 'POST', InventoryList);
  }

  PostUserCartData(CartId:string, ProductId:string[]){
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

  ///////////////////////////////////////////////////////////////////

  StoreCartList(productIdList: string[] | null, productList: any[] | null){
    var productIds: string[] | undefined;
    if(productIdList != null){
      productIds = productIdList;
    }
    else{
      productIds = productList?.map((product: any) => {
        return product.productId ?? "";
      });
    }
    try {
      const productIdsString = JSON.stringify(productIds);
      sessionStorage.setItem(AppConstants.CART_PRODUCT_ID_LIST, productIdsString);
      localStorage.setItem(AppConstants.CART_PRODUCT_ID_LIST, productIdsString);
    } catch (error) {}
  }

  GetCartList() {
    try {
      const productIdsString = sessionStorage.getItem(AppConstants.CART_PRODUCT_ID_LIST)?? localStorage.getItem(AppConstants.CART_PRODUCT_ID_LIST);
      return productIdsString ? JSON.parse(productIdsString) : [];
    } catch (error) { }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  setGreenSignal(value: boolean) {
    this.greenSignalToGetCartData = value;
  }

  getGreenSignal(): boolean {
    return this.greenSignalToGetCartData;
  }

}
