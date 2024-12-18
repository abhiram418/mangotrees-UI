import { DatePipe, Location, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionData } from '@models/ApiModels/ProductData';
import { CustomerAuthenticationService } from '@services/Customer/customer-authentication.service';
import { CustomerOrderService } from '@services/Customer/customer-order.service';
import { LoaderComponent } from "../../components/loader/loader.component";
import { OrderStatus } from '@models/OrderData';

@Component({
  selector: 'app-receipt-page',
  standalone: true,
  imports: [LoaderComponent, NgIf],
  providers: [DatePipe],
  templateUrl: './receipt-page.component.html',
  styleUrl: './receipt-page.component.css'
})
export class ReceiptPageComponent {
  @ViewChild('myVideo') myVideo!: ElementRef<HTMLVideoElement>;
  receiptData:TransactionData = new TransactionData();
  orderId:string = "";
  loader:boolean = true;

  constructor(private customerOrderService: CustomerOrderService, private customerAuthenticationService: CustomerAuthenticationService, private location: Location, private route: ActivatedRoute, private router: Router, private datePipe: DatePipe){
    this.GetTheOrderReceiptData()
  }

  GetTheOrderReceiptData(){
    this.orderId = this.route.snapshot.queryParamMap.get('OrderID') || '';
    
    if(this.orderId != null || this.orderId != ""){
      this.CallTheOrderReceiptData();
    }
    else{
      if (window.history.length > 1) {
        this.location.back()
      } else {
        this.router.navigate(["orders"]);
      }
    }
  }

  CallTheOrderReceiptData(){

    this.customerOrderService.GetTheOrderReceiptData(this.orderId).subscribe(
      result =>{
        this.loader = false;
        this.BuildCustomerOrdersReceiptData(result);
      },
      error =>{
        this.loader = false;
        if(error?.status == 401){
          this.customerAuthenticationService.ClearToken();
        }
        alert("Failed to Load Order's Receipt. Please try again.");
        if (window.history.length > 1) {
          this.location.back()
        } else {
          this.router.navigate(["orders"]);
        }
      }
    );
  }
  
  BuildCustomerOrdersReceiptData(transactionData: any){
    this.receiptData.OrderId = transactionData.orderId;
    this.receiptData.UserId = transactionData.userId;
    this.receiptData.TransactionId = transactionData.transactionId;
    this.receiptData.Amount = transactionData.amount;
    this.receiptData.PaymentMethod = transactionData.paymentMethod;
    this.receiptData.DeliveryMethod = transactionData.deliveryMethod;
    this.receiptData.TrackingNumber = transactionData.trackingNumber;
    this.receiptData.TransactionDate = this.datePipe.transform(transactionData.transactionDate, 'MMM d, yyyy') || '';
    this.receiptData.Status = Object.values(OrderStatus)[transactionData.status] as OrderStatus;
  }

  disableRightClick(event: MouseEvent): void {
    event.preventDefault();
  }

} 
