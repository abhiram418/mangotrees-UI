import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatePipe, Location, NgFor, NgIf } from '@angular/common';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { NavBarData } from '@models/navBarData';
import { FooterComponent } from "../../components/footer/footer.component";
import { OrderItem, OrderStatus } from '@models/OrderData';
import { CustomerOrderService } from '@services/Customer/customer-order.service';
import { LoaderComponent } from "../../components/loader/loader.component";
import { CustomerAuthenticationService } from '@services/Customer/customer-authentication.service';
import { OrderDescApiData } from '@models/ApiModels/ProductData';

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, NavBarComponent, FooterComponent, LoaderComponent],
  providers: [DatePipe],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css'
})
export class OrderPageComponent {
  @ViewChild('orderScroll') scrollableDiv!: ElementRef;
  ordersList:OrderDescApiData[] = [];
  loader: boolean = true;

  constructor(private customerOrderService: CustomerOrderService, private customerAuthenticationService: CustomerAuthenticationService, private location: Location, private router: Router, private datePipe: DatePipe) {
    this.GetAllTheCustomerOrders();
  }

  GetAllTheCustomerOrders(){
    
    this.customerOrderService.GetCustomerOrders().subscribe(
      result =>{
        this.ordersList = this.BuildCustomerOrdersListData(result);
        this.loader = false;
      },
      error =>{
        this.loader = false;
        if(error?.status == 401){
          this.customerAuthenticationService.ClearToken();
        }
        alert("Failed to Get Addresses. Please try again.");
        if (window.history.length > 1) {
          this.location.back()
        } else {
          this.router.navigate(["profile"]);
        }
      }
    );
  }


  BuildCustomerOrdersListData(ordersListData: any): OrderDescApiData[]{
    var orderList = [];

    for (let index = 0; index < ordersListData.length; index++) {
      var order = new OrderDescApiData();

      order.OrderId = ordersListData[index].orderId;
      order.OrderDate = this.datePipe.transform(ordersListData[index].orderDate, 'MMM d, yyyy') || '';
      order.ShippingAddress = ordersListData[index].shippingAddress;
      order.OrderItems = this.BuildCustomerOrderItemsData(ordersListData[index].orderItems);
      order.TotalAmount = ordersListData[index].totalAmount;
      order.PaymentMethod = ordersListData[index].paymentMethod;
      order.OrderStatus = Object.values(OrderStatus)[ordersListData[index].orderStatus] as OrderStatus;
      order.DeliveryMethod = ordersListData[index].deliveryMethod;
      order.TrackingNumber = ordersListData[index]?.trackingNumber;
      order.Notes = ordersListData[index]?.notes;
      order.IsGift = ordersListData[index]?.isGift;
      order.GiftMessage = ordersListData[index]?.giftMessage;
      order.DiscountedAmount = ordersListData[index]?.discountedAmount;
      order.PromotionApplied = ordersListData[index]?.promotionApplied;

      orderList[index] = order;
    }

    return orderList;
  }

  BuildCustomerOrderItemsData(orderItemsData: any): OrderItem[]{
    var orderItemsListData = [];

    for (let index = 0; index < orderItemsData.length; index++) {
      var orderItem = new OrderItem();

      orderItem.ProductId = orderItemsData[index].productId;
      orderItem.ProductTitle = orderItemsData[index].productTitle;
      orderItem.ProductDesc = orderItemsData[index].productDesc;
      orderItem.Price = orderItemsData[index].price;
      orderItem.Quantity = orderItemsData[index].quantity;
      orderItem.TotalPrice = orderItemsData[index].totalPrice;

      orderItemsListData[index] = orderItem;
    }
    return orderItemsListData;
  }

  ViewReceipt(orderId:any, status:OrderStatus){
    if(status == OrderStatus.AwaitingPayment || status == OrderStatus.PaymentFailed){
      alert("The receipt for this order is not available as payment has not been completed or has failed. Please try again after completing the payment");
    }
    else{
      this.router.navigate(['../receipt'],{ queryParams: { OrderID: orderId } });
    }
  }
  ViewProduct(IteamId:string){
    this.router.navigate(['/product'], { queryParams: { ProductID: IteamId } });
  }

  RedirectTo(to:string){
    this.router.navigate(['../'+to]);
  }
  Search(word:string){
    this.router.navigate(['/collections'], { queryParams: { search: word } });
  }

  scrollDiv() {
    this.scrollableDiv.nativeElement.scrollBy({ left: 380, behavior: 'smooth' }); // Scrolls right by 50px
  }

}
