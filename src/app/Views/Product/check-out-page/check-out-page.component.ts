import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { Location, NgFor, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopPageComponent } from "../../components/pop-page/pop-page.component";
import { Router } from '@angular/router';
import { ProductViewItemData } from '@models/ProductViewItemData';
import { AddressDesc } from '@models/CustomerProfileData';
import { ChargesModel, CustomerOrder, DeliveryMethodModel } from '@models/OrderData';
import { OrderService } from '@services/Product/order.service';
import { CustomerAuthenticationService } from '@services/Customer/customer-authentication.service';
import { LoaderComponent } from "../../components/loader/loader.component";

@Component({
  selector: 'app-check-out-page',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule, FormsModule, PopPageComponent, LoaderComponent],
  templateUrl: './check-out-page.component.html',
  styleUrl: './check-out-page.component.css'
})
export class CheckOutPageComponent {
  loader: boolean = true;
  popPage:boolean = false;
  couponPage:boolean = false;
  addressSelectPage:boolean = false;
  data = new ProductViewItemData();
  addressesList:AddressDesc[] =[];
  address!:AddressDesc;
  CustomerOrderData!: CustomerOrder;
  DiscountPercentage!: number;
  PackingCost!: number;
  charges: ChargesModel = new ChargesModel();
  TotalPrice: number = 0;

  constructor(private customerAuthenticationService: CustomerAuthenticationService, private orderService: OrderService, private location: Location, private router:Router){
    this.GetChargesDataFromApi();
  }
  ngOnInit(): void {
    this.customerAuthenticationService.GetCustomerData().subscribe((data) => {
      if(data != null){
        this.addressesList = data.AddressList;
        this.GetTheOrderHalfFilledData();
      }
    });
  }
  options = [
    { id: 0, value: "QTY", disabled: true },
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 }
  ];

  GetChargesDataFromApi(){
    this.loader = true;
    this.orderService.GetTheDeliveryAndPackagingCostData("1").subscribe(
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
        this.loader = false;
        if (window.history.length > 1) {
          this.location.back()
        } else {
          this.router.navigate(["review"]);
        }
      }
    );
  }

  GetTheOrderHalfFilledData(){
    var orderData = this.orderService.GetCustomerOrderData();
    if(orderData != null){
      this.CustomerOrderData = orderData;
      this.address = this.addressesList.find((address) => address?.AddressID == this.CustomerOrderData.ShippingAddress)!;
      this.BuildTheDeliveryData();
    }
    else{
      if (window.history.length > 1) {
        this.location.back()
      } else {
        this.router.navigate(["cart"]);
      }
    }
  }


  BuildTheDeliveryData(){
    this.loader = false;
    var mangoesCount = 0;
    var mangoesWeight = 0;
    this.CustomerOrderData.TotalAmount = 0;

    for (let index = 0; index < this.CustomerOrderData.OrderItems.length; index++) {
      mangoesCount += Number(this.CustomerOrderData.OrderItems[index].Quantity * this.CustomerOrderData.OrderItems[index].Units);
      mangoesWeight += Number(this.CustomerOrderData.OrderItems[index].Quantity * this.CustomerOrderData.OrderItems[index].Weight);
      this.CustomerOrderData.OrderItems[index].TotalPrice = this.CustomerOrderData.OrderItems[index].Quantity * this.CustomerOrderData.OrderItems[index].Price;
      this.CustomerOrderData.TotalAmount += this.CustomerOrderData.OrderItems[index].TotalPrice;
    }

    if (this.CustomerOrderData.PackagingMethod === 'Premium') {
      this.PackingCost = this.charges.Premium * (mangoesCount); 
    } else if (this.CustomerOrderData.PackagingMethod === 'Pocket-Friendly') {
      this.PackingCost = this.charges.PocketFriendly * (mangoesCount); 
    } else if (this.CustomerOrderData.PackagingMethod === 'Basic') {
      this.PackingCost = this.charges.Basic * (mangoesCount); 
    }

    if (this.CustomerOrderData.DeliveryMethod.DeliveryMethod === 'Dedicated') {
      this.CustomerOrderData.DeliveryMethod.Cost = this.charges.Dedicated * (mangoesWeight); 
    } else if (this.CustomerOrderData.DeliveryMethod.DeliveryMethod === 'Third-Party') {
      this.CustomerOrderData.DeliveryMethod.Cost = this.charges.ThirdParty * (mangoesWeight); 
    } else if (this.CustomerOrderData.DeliveryMethod.DeliveryMethod === 'APSRTC') {
      this.CustomerOrderData.DeliveryMethod.Cost = this.charges.APSRTC * (mangoesWeight); 
    }
    
    this.CustomerOrderData.DiscountedAmount = this.CustomerOrderData.TotalAmount * (this.DiscountPercentage / 100);
    this.CustomerOrderData.PaymentMethod = "Online";
    if(this.CustomerOrderData.DeliveryMethod.DeliveryMethod == "PickUp"){
      this.TotalPrice = this.CustomerOrderData.TotalAmount;
      this.CustomerOrderData.PaymentMethod = "Cash";
    }
    else{
      this.TotalPrice = (this.CustomerOrderData.TotalAmount + this.CustomerOrderData.DeliveryMethod.Cost + this.PackingCost);
    }
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
          alert("Unfortunately, the coupon is invalid or expired. Please check the code and try again.");
        }
      },
      error=>{
        alert("Unfortunately, the coupon is invalid or expired. Please check the code and try again.");
      }
    );
  }

  PayAndPlaceOrder(){
    this.loader = true;
    this.CustomerOrderData.TotalAmount = this.TotalPrice;
    console.log(this.CustomerOrderData);
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

