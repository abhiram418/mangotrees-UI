import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddressUpdateComponent } from "../../Customer/address-update/address-update.component";
import { NgIf } from '@angular/common';
import { OTPPageComponent } from "../../Customer/otp-page/otp-page.component";
import { CouponCodePageComponent } from "../../Product/coupon-code-page/coupon-code-page.component";
import { AddressSelectComponent } from "../../Customer/address-select/address-select.component";
import { AddressDesc } from '@models/CustomerProfileData';

@Component({
  selector: 'app-pop-page',
  standalone: true,
  imports: [NgIf, AddressUpdateComponent, OTPPageComponent, CouponCodePageComponent, AddressSelectComponent],
  templateUrl: './pop-page.component.html',
  styleUrl: './pop-page.component.css'
})
export class PopPageComponent {
  @Input() pageToDisplay: string = '';
  @Input() Title: string = '';
  @Input() addressData: AddressDesc = new AddressDesc();
  @Input() addressesList: AddressDesc[] = [];
  @Output() close = new EventEmitter<any>();
  @Output() data = new EventEmitter<any>();
  ViewsList: { [key: string]: {value:boolean} } = { "address-update": { value: false }, "otp": { value: false }, "coupon": { value: false}, "address-select": { value: false}, "gift-message": { value: false}};

  constructor(){
    this.addressData.AddressTitle = "";
    this.addressData.City = "";
  }

  ngOnChanges() {
    if (this.pageToDisplay) {
      this.changeDiaplay(this.pageToDisplay);
    }
  }

  saveData(allData:any){
    this.data.emit(allData);
    this.closePage();
  }
  closePage(){
    this.close.emit(true);
  }
  changeDiaplay(page:string){
    for (var key in this.ViewsList) {
      this.ViewsList[key].value = false;
    }
    this.ViewsList[page].value = true;
  }

}
