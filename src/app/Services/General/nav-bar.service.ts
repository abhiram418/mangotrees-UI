import { Injectable } from '@angular/core';
import { NavBarData } from '@models/navBarData';
import { CustomerCartService } from '@services/Customer/customer-cart.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {
  private navBarDataSubject = new BehaviorSubject<NavBarData | null>(null);
  navBarData$ = this.navBarDataSubject.asObservable();

  constructor(private customerCartService: CustomerCartService) { }

  GetCartCount(cartId: string){
    this.customerCartService.GetUserCartData(cartId).subscribe(
      result=>{
        let count = result.length;
        this.SetCartCount(count);
        this.customerCartService.StoreCartList(null, result);
      }
    );
  }

  SetCartCount(count: number){
    const currentData = this.navBarDataSubject.value;
    if (currentData) {
      const updatedData = {
        ...currentData,
        CartCount: count
      };
      this.navBarDataSubject.next(updatedData);
    } else {
      console.log("No NavBarData found to update CartCount.");
    }
  }

  StoreUserData(data: any){
    const primaryAddress = data.addressList.find((address: any) => address.isPrimary === true);

    const navBarData: NavBarData = {
      UserName: data.firstName,
      CityName: primaryAddress.city,
      Pincode: primaryAddress.pincode,
      CartCount: 0
    };
    this.navBarDataSubject.next(navBarData);
  }

  GetNavBarData(): Observable<NavBarData | null> {
    return this.navBarData$; // Provide Observable for components
  }

  ClearNavBarData() {
    this.navBarDataSubject.next(null);
  }
}
