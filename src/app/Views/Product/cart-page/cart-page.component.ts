import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { CustomerCartService } from '@services/Customer/customer-cart.service';
import { CartData } from '@models/CartData';
import { LoaderComponent } from "../../components/loader/loader.component";
import { CustomerAuthenticationService } from '@services/Customer/customer-authentication.service';
import { NavBarService } from '@services/General/nav-bar.service';
import { Subscription } from 'rxjs';
import { CustomerOrder, OrderItem } from '@models/OrderData';
import { AddressDesc } from '@models/CustomerProfileData';
import { OrderService } from '@services/Product/order.service';
import { ProductDataService } from '@services/Product/product-data.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, NavBarComponent, LoaderComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  private subscription!: Subscription;
  greenSignalToGetCartData:boolean = false;
  CustomerOrderData!: CustomerOrder;
  address!:AddressDesc;
  cartId: string = "";
  CartList: CartData[] = [];
  ProductIdList: string[] = [];
  ProductInfoList: any[] = [];
  loader: boolean = true;

  constructor(private customerAuthenticationService: CustomerAuthenticationService, private customerCartService: CustomerCartService, private orderService: OrderService, private productDataService: ProductDataService, private navBarService: NavBarService, private router:Router){}
  ngOnInit(): void {
    this.subscription = this.customerAuthenticationService.greenSignalToGetCartData$.subscribe((message) => {
      this.customerCartService.setGreenSignal(message);
      this.GetCartData();
    });
    this.customerAuthenticationService.GetCustomerData().subscribe((data) => {
      const primaryAddress = data?.AddressList.find((address) => address?.IsPrimary == true);
      this.address = primaryAddress!;
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  GetCartData(){
    this.cartId = this.customerCartService.GetCartIdFromStorage();
    this.greenSignalToGetCartData = this.customerCartService.getGreenSignal();

    if(this.cartId != "" && this.greenSignalToGetCartData){
      this.customerCartService.GetUserCartData(this.cartId).subscribe(
        result=>{
          this.BuildCartData(result);
          this.navBarService.SetCartCount(result.length);
          this.customerCartService.StoreCartList(null, result);
        },
        error=>{
          this.loader = false;
          if(error?.status == 401){
            this.customerAuthenticationService.ClearToken();
          }
          alert("Failed to load your Cart. Please try again.");
        }
      );
    }
  }
  GetMaxValueData(InventoryList:string[]){
    this.customerCartService.GetInventoryData(InventoryList).subscribe(
      result=>{
        this.BuildMaxValueData(result);
        this.navBarService.SetCartCount(result.length);
      },
      error=>{
        this.loader = false;
        if(error?.status == 401){
          this.customerAuthenticationService.ClearToken();
        }
        alert("Failed to load your Cart. Please try again.");
      }
    );
  }
  GetProductInfoListData(){
    var idList = this.customerCartService.GetCartList();
    this.productDataService.GetProductInfoListData(idList).subscribe(
      result=>{
        this.BuildProductInfoData(result);
        this.loader = false;
      },
      error=>{
        this.loader = false;
        if(error?.status == 401){
          this.customerAuthenticationService.ClearToken();
        }
        alert("Failed to load your Cart. Please try again.");
      }
    );
  }
  PostUserCartData(ItemList: string[]){
    this.customerCartService.PostUserCartData(this.cartId, ItemList).subscribe(
      result=>{
        this.loader = false;
        this.navBarService.SetCartCount(result.length);
        this.customerCartService.StoreCartList(result, null);
      },
      error =>{
        this.loader = false;
        if(error?.status == 401){
          this.customerAuthenticationService.ClearToken();
        }
        alert("Failed to Update your Cart. Please try again.");
      }
    );
  }


  BuildProductInfoData(productInfoData: any){
    this.ProductInfoList = productInfoData;
  }
  BuildMaxValueData(inventoryData: any){
    for (const inventory of inventoryData) {
      const matchingCartItem = this.CartList.find(cartItem => cartItem.ProductId == inventory.productId);
  
      if (matchingCartItem) {
        matchingCartItem.ItemMaxCount = inventory.stockQuantity;
      }
    }
    this.GetProductInfoListData();
  }
  BuildCartData(cartData: any){
    var InventoryList = [];
    for (let index = 0; index < cartData.length; index++) {
      this.CartList[index] = new CartData();
      
      this.CartList[index].ProductId = cartData[index].productId;
      this.CartList[index].ItemImage = cartData[index].images[0];
      this.CartList[index].ItemTitle = cartData[index].productTitle;
      this.CartList[index].ItemDesc = cartData[index].productDesc;
      this.CartList[index].ItemPrice = cartData[index].price;
      this.CartList[index].ItemMaxCount = 100;
      this.CartList[index].ItemCount = 1;

      this.ProductIdList[index] = cartData[index].productId;
      InventoryList[index] = cartData[index].inventoryId;
    }
    this.GetMaxValueData(InventoryList);
  }
  BuildCustomerOrderData(){
    this.CustomerOrderData = new CustomerOrder();

    this.CustomerOrderData.OrderDate = new Date();
    this.CustomerOrderData.ShippingAddress = this.address.AddressID;
    this.CustomerOrderData.OrderItems = this.BuildCartListItemData(this.CartList);
    this.CustomerOrderData.TotalAmount = this.BuildItemTotalPriceData(this.CustomerOrderData.OrderItems);
    
    this.orderService.SetCustomerOrderData(this.CustomerOrderData);
  }
  BuildCartListItemData(ItemList: any): OrderItem[]{
    var ItemsListData: OrderItem[] = [];
    for (let index = 0; index < ItemList.length; index++) {
      var ItemData = new OrderItem();
      ItemData.ProductId = ItemList[index].ProductId;
      ItemData.ProductTitle = ItemList[index].ItemTitle;
      ItemData.ProductDesc = ItemList[index].ItemDesc;
      ItemData.Image = ItemList[index].ItemImage;
      ItemData.Quantity = Number(ItemList[index].ItemCount);
      ItemData.ItemMaxCount = ItemList[index].ItemMaxCount;
      ItemData.Price = ItemList[index].ItemPrice;
      ItemData.TotalPrice = ItemList[index].ItemCount * ItemList[index].ItemPrice;

      let productInfo = this.ProductInfoList.find(
        (data: any) => data.productId === ItemList[index].ProductId
      );
      ItemData.Units = productInfo.numberOfMangoes;
      ItemData.Weight = productInfo.weight;
      ItemsListData.push(ItemData);
    }
    return ItemsListData;
  }
  BuildItemTotalPriceData(orderItems: any): number{
    var TotalPrice = 0;
    for (let index = 0; index < orderItems.length; index++) {
      TotalPrice = TotalPrice + orderItems[index].TotalPrice;
    }
    return TotalPrice;
  }

  countIncrease(index: number){
    if(this.CartList[index].ItemCount == this.CartList[index].ItemMaxCount){
      alert("The Max is reached");
    }
    else{
      this.CartList[index].ItemCount++;
    }
  }
  countDecrease(index: number){
    if(this.CartList[index].ItemCount <= 1){
      this.loader = true;
      this.GetTheCartUpdateDataReady(this.CartList[index].ProductId)
    }
    else{
      this.CartList[index].ItemCount--;
    }
  }
  clearCart(){
    this.loader = true;
    this.CartList = [];
    this.PostUserCartData([]);
  }

  GetTheCartUpdateDataReady(productId: string){
    const index = this.ProductIdList.indexOf(productId);
    const cartIndex = this.CartList.findIndex(item => item.ProductId == productId);

    if (cartIndex != -1) {
      this.ProductIdList.splice(index, 1);
      this.CartList.splice(cartIndex, 1);
      this.PostUserCartData(this.ProductIdList);
    }
  }



  ContinueButtonClicked(){
    if(this.address != null && this.CartList.length > 0){
      this.BuildCustomerOrderData();
      this.router.navigate(["../review"]);
    }
  }

  RedirectTo(to:string){
    this.router.navigate(['/'+to]);
  }
  Search(word:string){
    this.router.navigate(['/collections'], { queryParams: { search: word } });
  }

}
