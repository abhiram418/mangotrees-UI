import { Injectable } from '@angular/core';
import { NavBarService } from '@services/General/nav-bar.service';
import { CustomerCartService } from './customer-cart.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerCartSharedService {

  constructor(private customerCartService: CustomerCartService, private navBarService: NavBarService) { }

  AddProductToTheCart(productId: string){
    var cartId = this.customerCartService.GetCartIdFromStorage();
    this.PostProductToTheCart(cartId, productId);
  }

  PostProductToTheCart(cartId: string, productId: string){
    var productIdList = this.customerCartService.GetCartList();
    productIdList.push(productId);

    this.customerCartService.PostUserCartData(cartId, productIdList).subscribe(
      result=>{
        this.navBarService.SetCartCount(result.length);
        this.customerCartService.StoreCartList(result, null);
      },
      error =>{
        alert("Failed to add to your Cart. Please try again.");
      }
    );
  }


}
