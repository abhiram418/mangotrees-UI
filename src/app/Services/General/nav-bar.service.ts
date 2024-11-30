import { Injectable } from '@angular/core';
import { NavBarData } from '@models/navBarData';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {
  private navBarDataSubject = new BehaviorSubject<NavBarData | null>(null);
  navBarData$ = this.navBarDataSubject.asObservable()

  constructor() { }

  SetCartCount(count: number){
    const currentData = this.navBarDataSubject.value;
    if (currentData) {
      const updatedData = {
        ...currentData,
        CartCount: count
      };
      this.navBarDataSubject.next(updatedData);
    } else {
      console.warn("No NavBarData found to update CartCount.");
    }
  }

  StoreUserData(data: any){
    const navBarData: NavBarData = {
      UserName: data.firstName,
      CityName: data.addressList[0].city,
      Pincode: data.addressList[0].pincode,
      CartCount: 0
    };
    this.navBarDataSubject.next(navBarData);
  }

  GetNavBarData(): Observable<NavBarData | null> {
    return this.navBarData$; // Provide Observable for components
  }
}
