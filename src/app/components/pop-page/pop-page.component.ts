import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddressUpdateComponent } from "../../Customer/address-update/address-update.component";
import { NgIf } from '@angular/common';
import { AddressDesc } from '../../Models/CustomerProfileData';
import { OTPPageComponent } from "../../Customer/otp-page/otp-page.component";

@Component({
  selector: 'app-pop-page',
  standalone: true,
  imports: [NgIf, AddressUpdateComponent, OTPPageComponent],
  templateUrl: './pop-page.component.html',
  styleUrl: './pop-page.component.css'
})
export class PopPageComponent {
  @Input() pageToDisplay: string = '';
  @Input() addressData: AddressDesc = new AddressDesc();
  @Output() close = new EventEmitter<any>();
  @Output() data = new EventEmitter<any>();
  ViewsList: { [key: string]: {value:boolean} } = { "address-update": { value: false }, "otp": { value: false }};

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
