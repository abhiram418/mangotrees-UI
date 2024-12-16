import { Injectable } from '@angular/core';
import { ApiRequestsService } from '@services/api-requests.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerOrderService {

  constructor(private apiRequests: ApiRequestsService) { }

  GetCustomerOrders(){
    const endpoint = 'Customer/Orders';
    return this.apiRequests.sendRequest(endpoint, 'GET');
  }

  PostCustomerOrders(OrderData: any){
    const endpoint = 'Customer/Orders';
    return this.apiRequests.sendRequest(endpoint, 'POST', OrderData);
  }

  GetTheOrderReceiptData(orderId:string){
    const endpoint = `Customer/Order/Receipt?orderId=${encodeURIComponent(orderId)}`;
    return this.apiRequests.sendRequest(endpoint, 'GET');
  }

  PostReviewData(productId: string, orderItemId: string, ReviewData: any){
    const endpoint = `Product/Review?productId=${encodeURIComponent(productId)}&orderItemId=${encodeURIComponent(orderItemId)}`;
    return this.apiRequests.sendRequest(endpoint, 'POST', ReviewData);
  }

}
