import { Injectable } from '@angular/core';
import { CustomerOrder } from '@models/OrderData';
import { ApiRequestsService } from '@services/api-requests.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  CustomerOrderData!: CustomerOrder;

  constructor(private apiRequests: ApiRequestsService) { }

  GetTheDeliveryAndPackagingCostData(chargesId: string){
    const endpoint = `Product/Charges?ChargesId=${encodeURIComponent(chargesId)}`;
    return this.apiRequests.sendRequest(endpoint, 'GET');
  }

  GetCouponCodeData(coupon: string, price: number){
    const endpoint = `Product/PromotionCode?promotionCode=${encodeURIComponent(coupon)}&amount=${encodeURIComponent(price)}`;
    return this.apiRequests.sendRequest(endpoint, 'GET');
  }

  SetCustomerOrderData(orderData: CustomerOrder){
    this.CustomerOrderData = orderData;
  }

  GetCustomerOrderData(): CustomerOrder{
    return this.CustomerOrderData;
  }
}
