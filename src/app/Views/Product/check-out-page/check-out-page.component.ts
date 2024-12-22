import { Component } from '@angular/core';
import { Location, NgFor, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopPageComponent } from "../../components/pop-page/pop-page.component";
import { Router, RouterLink } from '@angular/router';
import { ProductViewItemData } from '@models/ProductViewItemData';
import { AddressDesc } from '@models/CustomerProfileData';
import { ChargesModel, CustomerOrder } from '@models/OrderData';
import { OrderService } from '@services/Product/order.service';
import { CustomerAuthenticationService } from '@services/Customer/customer-authentication.service';
import { LoaderComponent } from "../../components/loader/loader.component";

@Component({
  selector: 'app-check-out-page',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, CommonModule, FormsModule, PopPageComponent, LoaderComponent],
  templateUrl: './check-out-page.component.html',
  styleUrl: './check-out-page.component.css'
})
export class CheckOutPageComponent {
  loader: boolean = true;
  popPage:boolean = false;
  popPageTitle: string = "Enter Coupon"
  couponPage:boolean = false;
  addressSelectPage:boolean = false;
  data = new ProductViewItemData();
  addressesList:AddressDesc[] =[];
  address!:AddressDesc;
  CustomerOrderData!: CustomerOrder;
  DiscountPercentage!: number;
  PackingCost!: number;
  charges: ChargesModel = new ChargesModel();
  mangoesCount = 0;
  mangoesWeight = 0;
  TotalPrice: number = 0;

  constructor(private customerAuthenticationService: CustomerAuthenticationService, private orderService: OrderService, private location: Location, private router:Router){}
  ngOnInit(): void {
    this.customerAuthenticationService.GetCustomerData().subscribe((data) => {
      if(data != null){
        this.addressesList = data.AddressList;
        this.GetTheOrderHalfFilledData();
      }
    });
  }
  generateRange(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i + 1); // Creates an array [1, 2, ..., count]
  }

  GetChargesDataFromApi(){
    this.loader = true;
    this.orderService.GetTheDeliveryAndPackagingCostData(this.address.Pincode).subscribe(
      result=>{
        this.charges.APSRTC = result.apsrtc;
        this.charges.ThirdParty = result.thirdParty;
        this.charges.Dedicated = result.dedicated;
        this.charges.Premium = result.premium;
        this.charges.PocketFriendly = result.pocketFriendly;
        this.charges.Basic = result.basic;

        this.BuildTheDeliveryData();
      },
      error=>{
        alert("We’re sorry! Mangoes cannot be delivered to the selected Primary address at the moment. Please choose a different location and refresh the page or contact our support for assistance.");
        this.loader = false;
        let SelectAddress = this.addressesList[0].AddressID==this.address.AddressID? this.addressesList[1]:this.addressesList[0];
        if(SelectAddress != null){
          this.address =  SelectAddress; 
        }
        this.GetChargesDataFromApi();
      }
    );
  }

  GetTheOrderHalfFilledData(){
    var orderData = this.orderService.GetCustomerOrderData();
    if(orderData != null && orderData.OrderItems.length != 0||null){
      this.CustomerOrderData = orderData;
      this.address = this.addressesList.find((address) => address?.AddressID == this.CustomerOrderData.ShippingAddress)!;
      this.BuildTheDeliveryData();
      this.GetChargesDataFromApi();
    }
    else{
      this.router.navigate(["cart"]);
    }
  }


  BuildTheDeliveryData(){
    this.loader = false;
    this.mangoesWeight = 0;
    this.mangoesCount = 0;
    this.CustomerOrderData.TotalAmount = 0;

    this.CalculateCountAndWeightOfMangoes();
    this.CalculatePackagingMethodCost();
    this.CalculateDeliveryMethodCost();
    
    this.CustomerOrderData.PaymentMethod = "Online";
    if(this.CustomerOrderData.DeliveryMethod.DeliveryMethod == "PickUp"){
      this.TotalPrice = this.CustomerOrderData.TotalAmount + (this.CustomerOrderData.TotalAmount * 0.18 );
      this.CustomerOrderData.PaymentMethod = "Cash";
    }
    else{
      this.TotalPrice = (this.CustomerOrderData.TotalAmount + this.CustomerOrderData.DeliveryMethod.Cost + this.PackingCost) + (this.CustomerOrderData.TotalAmount * 0.18 );
    }
    
    this.CustomerOrderData.DiscountedAmount = this.CustomerOrderData.TotalAmount * (this.DiscountPercentage / 100);
    if(this.CustomerOrderData.DiscountedAmount){
      this.TotalPrice = this.TotalPrice - this.CustomerOrderData.DiscountedAmount;
    }
  }
  GetCouponCodeData(coupon: string){
    this.orderService.GetCouponCodeData(coupon, this.TotalPrice).subscribe(
      result=>{
        if(result?.discountPercentage != null){
          this.DiscountPercentage = result.discountPercentage;
          this.CustomerOrderData.PromotionApplied = coupon;
          this.BuildTheDeliveryData();
          alert("Congratulations! Your coupon has been successfully applied.");
        }
        else{
          this.DiscountPercentage = 0;
          this.CustomerOrderData.PromotionApplied = null!;
          this.BuildTheDeliveryData();
          alert("Unfortunately, the coupon is invalid or expired. Please check the code and try again.");
        }
      },
      error=>{
        alert("Unfortunately, the coupon is invalid or expired. Please check the code and try again.");
      }
    );
  }

  deleteOrderItem(index: number): void {
    if (index > -1) {
      this.CustomerOrderData.OrderItems.splice(index, 1);
      this.BuildTheDeliveryData();
    }
    if(this.CustomerOrderData.OrderItems.length == 0){
      this.router.navigate(["cart"]);
    }
  }
  CalculateCountAndWeightOfMangoes(){
    for (let index = 0; index < this.CustomerOrderData.OrderItems.length; index++) {
      this.mangoesCount += Number(this.CustomerOrderData.OrderItems[index].Quantity * this.CustomerOrderData.OrderItems[index].Units);
      this.mangoesWeight += Number(this.CustomerOrderData.OrderItems[index].Quantity * this.CustomerOrderData.OrderItems[index].Weight);
      this.CustomerOrderData.OrderItems[index].TotalPrice = this.CustomerOrderData.OrderItems[index].Quantity * this.CustomerOrderData.OrderItems[index].Price;
      this.CustomerOrderData.TotalAmount += this.CustomerOrderData.OrderItems[index].TotalPrice;
    }
  }
  CalculatePackagingMethodCost(){
    if (this.CustomerOrderData.PackagingMethod === 'Premium') {
      this.PackingCost = this.charges.Premium * (this.mangoesCount); 
    } else if (this.CustomerOrderData.PackagingMethod === 'Pocket-Friendly') {
      this.PackingCost = this.charges.PocketFriendly * (this.mangoesCount); 
    } else if (this.CustomerOrderData.PackagingMethod === 'Basic') {
      this.PackingCost = this.charges.Basic * (this.mangoesCount); 
    }
  }
  CalculateDeliveryMethodCost(){
    if (this.CustomerOrderData.DeliveryMethod.DeliveryMethod === 'Dedicated') {
      this.CustomerOrderData.DeliveryMethod.Cost = this.charges.Dedicated * (this.mangoesWeight); 
    } else if (this.CustomerOrderData.DeliveryMethod.DeliveryMethod === 'Third-Party') {
      if(this.mangoesWeight <= 17){
        this.CustomerOrderData.DeliveryMethod.Cost = this.charges.ThirdParty * (this.mangoesWeight) * 2; 
      }
      else{
        this.CustomerOrderData.DeliveryMethod.Cost = this.charges.ThirdParty * (this.mangoesWeight); 
      }
    } else if (this.CustomerOrderData.DeliveryMethod.DeliveryMethod === 'APSRTC') {
      this.CustomerOrderData.DeliveryMethod.Cost = this.charges.APSRTC * (this.mangoesWeight); 
    }
  }

  PayAndPlaceOrder(){
    this.loader = true;
    this.CustomerOrderData.TotalAmount = this.TotalPrice;
    console.log(this.CustomerOrderData);
  }

  ViewProduct(IteamId:string){
    this.router.navigate(['/product'], { queryParams: { ProductID: IteamId } });
  }
  RedirectToInformation(word:string){
    this.router.navigate(['/information'], { queryParams: { page: word } });
  }

  GetCouponCodes(){
    this.popPage = true;
    this.couponPage = true;
  }
  SelectAddress(){
    this.popPage = true;
    this.addressSelectPage = true;
  }

  popPageData(data:any){
    if(this.addressSelectPage){
      this.address = data;
      this.CustomerOrderData.ShippingAddress = this.address.AddressID;
      this.GetChargesDataFromApi();
    }
    else{
      this.GetCouponCodeData(data);
    }
  }
  ClosePopPage(close:boolean){
    this.popPage = false;
    this.couponPage = false;
    this.addressSelectPage = false;
  }

}

