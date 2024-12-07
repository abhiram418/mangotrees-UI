import { Injectable } from '@angular/core';
import { CustomerOrder } from '@models/OrderData';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  CustomerOrderData!: CustomerOrder;

  constructor() { }

  SetCustomerOrderData(orderData: CustomerOrder){
    this.CustomerOrderData = orderData;
  }

  GetCustomerOrderData(){
    return this.CustomerOrderData;
  }
}
