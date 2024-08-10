import { Component } from '@angular/core';
import { PopUpComponent } from "../../components/pop-up/pop-up.component";
import { NgIf } from '@angular/common';
import { DeliveryType, PackagingType, PopUpData } from '../../Models/PopUpData';

@Component({
  selector: 'app-review-delivery-page',
  standalone: true,
  imports: [PopUpComponent, NgIf],
  templateUrl: './review-delivery-page.component.html',
  styleUrl: './review-delivery-page.component.css'
})
export class ReviewDeliveryPageComponent {
  popUp:boolean=false;
  popUpData:PopUpData = new PopUpData();
  popUpText:string="jsjndk"

  showPopUp(service:string){
    switch(service){
      case DeliveryType.RTC:{
        this.popUp = true;
        this.popUpText = this.popUpData.APSRTC;
        break;
      }
      case DeliveryType.Third_Party:{
        this.popUp = true;
        this.popUpText = this.popUpData.Third_Party;
        break;
      }
      case DeliveryType.Dedicated:{
        this.popUp = true;
        this.popUpText = this.popUpData.Dedicated;
        break;
      }
      case PackagingType.Premium:{
        this.popUp = true;
        this.popUpText = this.popUpData.Premium;
        break;
      }
      case PackagingType.Pocket_Friendly:{
        this.popUp = true;
        this.popUpText = this.popUpData.Pocket_Friendly;
        break;
      }
      case PackagingType.Basic:{
        this.popUp = true;
        this.popUpText = this.popUpData.Basic;
        break;
      }
    }
  }
  closePopUp(event:any){
    this.popUp = event;
  }
}
