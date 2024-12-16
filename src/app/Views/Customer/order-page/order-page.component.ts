import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, DatePipe, Location, NgFor, NgIf } from '@angular/common';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { OrderItem, OrderStatus } from '@models/OrderData';
import { CustomerOrderService } from '@services/Customer/customer-order.service';
import { LoaderComponent } from "../../components/loader/loader.component";
import { CustomerAuthenticationService } from '@services/Customer/customer-authentication.service';
import { OrderDescApiData } from '@models/ApiModels/ProductData';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, RouterLink, CommonModule, NavBarComponent, FooterComponent, LoaderComponent],
  providers: [DatePipe],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css'
})
export class OrderPageComponent {
  loader: boolean = true;
  @ViewChild('orderScroll') scrollableDiv!: ElementRef;
  ordersList:OrderDescApiData[] = [];

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
        alert("Failed to Get Orderes. Please try again.");
        if (window.history.length > 1) {
          this.location.back()
        } else {
          this.router.navigate(["profile"]);
        }
      }
    );
  }
  PostReviewData(productId: string, orderItemId: string, ReviewData: any, index: number, ind: number){
    this.customerOrderService.PostReviewData(productId, orderItemId, ReviewData).subscribe(
      result=>{
        this.loader = false;
        this.ordersList[ind].OrderItems[index].IsReviewed = true;
      },
      error=>{
        this.loader = false;
        if(error?.status == 401){
          this.customerAuthenticationService.ClearToken();
        }
        if (window.history.length > 1) {
          this.location.back()
        } else {
          this.router.navigate(["profile"]);
        }
      }
    )
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

      orderItem.OrderItemId = orderItemsData[index].orderItemId;
      orderItem.ProductId = orderItemsData[index].productId;
      orderItem.ProductTitle = orderItemsData[index].productTitle;
      orderItem.ProductDesc = orderItemsData[index].productDesc;
      orderItem.Price = orderItemsData[index].price;
      orderItem.Quantity = orderItemsData[index].quantity;
      orderItem.TotalPrice = orderItemsData[index].totalPrice;
      orderItem.IsReviewed = orderItemsData[index].isReviewed;

      orderItemsListData[index] = orderItem;
    }
    return orderItemsListData;
  }

  ValidatePostReviewData(orderItemData: OrderItem, index: number, ind: number){
    this.loader = true
    if (
      orderItemData.ProductId!?.trim().length > 0 &&
      orderItemData.OrderItemId?.trim().length > 0 &&
      orderItemData.Rating! > 0 &&
      orderItemData.Title!?.trim().length > 0 &&
      orderItemData.Review!?.trim().length > 3
    ) {
      var ReviewData = {
        Rating: orderItemData.Rating,
        Title: orderItemData.Title?.trim(),
        Review: orderItemData.Review?.trim(),
        Date: new Date()
      };
      this.PostReviewData(orderItemData.ProductId!, orderItemData.OrderItemId, ReviewData, index, ind);
    }
    else{
      this.loader = false;
      alert("Please Validate the Fields");
    }

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
  setRating(rating: number, index: number, i: number) {
    this.ordersList[index].OrderItems[i].Rating = rating;
  }
}
