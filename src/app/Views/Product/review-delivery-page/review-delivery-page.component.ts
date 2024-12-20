import { Component } from '@angular/core';
import { PopUpComponent } from "../../components/pop-up/pop-up.component";
import { Location, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DeliveryType, PackagingType, PopUpData } from '@models/PopUpData';
import { OrderService } from '@services/Product/order.service';
import { CustomerOrder, DeliveryMethodModel } from '@models/OrderData';
import { LoaderComponent } from "../../components/loader/loader.component";
import { PopPageComponent } from "../../components/pop-page/pop-page.component";

@Component({
  selector: 'app-review-delivery-page',
  standalone: true,
  imports: [PopUpComponent, ReactiveFormsModule, FormsModule, RouterModule, NgIf, LoaderComponent, PopPageComponent],
  templateUrl: './review-delivery-page.component.html',
  styleUrl: './review-delivery-page.component.css'
})
export class ReviewDeliveryPageComponent {
  loader: boolean = true;
  popUp:boolean = false;
  popPage:boolean = false;
  popPageTitle: string = "Enter Gift Message"
  popUpData:PopUpData = new PopUpData();
  popUpHeading:string="";
  popUpText:string="";
  ReviewForm!: FormGroup;
  CustomerOrderData!: CustomerOrder;
  IsGift?: boolean;
  GiftMessage?: string;

  constructor(private orderService: OrderService, private location: Location, private router: Router){
    this.GetTheOrderHalfFilledData();
  }
  ngOnInit(): void {
    this.ReviewForm = new FormGroup({
      deliveryOption: new FormControl("Third-Party", [Validators.required]),
      packageOption: new FormControl("Premium", [Validators.required])
    });
  }


  GetTheOrderHalfFilledData(){
    var orderData = this.orderService.GetCustomerOrderData();
    if(orderData != null){
      this.loader = false;
      this.CustomerOrderData = orderData;
    }
    else{
      if (window.history.length > 1) {
        this.location.back()
      } else {
        this.router.navigate(["cart"]);
      }
    }
  }

  BuildOrderReviewData(){
    this.CustomerOrderData.PackagingMethod = this.ReviewForm.get('packageOption')?.value;
    this.CustomerOrderData.DeliveryMethod = new DeliveryMethodModel();
    this.CustomerOrderData.DeliveryMethod.DeliveryMethod = this.ReviewForm.get('deliveryOption')?.value;
    this.CustomerOrderData.DeliveryMethod.Cost = 0;
    this.CustomerOrderData.IsGift = this.IsGift;
    if(this.IsGift){
      this.CustomerOrderData.GiftMessage = this.GiftMessage;
    }

    this.orderService.SetCustomerOrderData(this.CustomerOrderData);
  }

  proceedButtonClicked(){
    if(this.ReviewForm.valid){
      this.BuildOrderReviewData();
      this.router.navigate(["../checkout"]);
    }
    else{
      alert("Please Validate the Fields");
    }
  }
  RedirectToInformation(word:string){
    this.router.navigate(['/information'], { queryParams: { page: word } });
  }

  showPopUp(service:string){
    switch(service){
      case DeliveryType.RTC:{
        this.popUp = true;
        this.popUpHeading = DeliveryType.RTC_Title;
        this.popUpText = this.popUpData.APSRTC;
        break;
      }
      case DeliveryType.Third_Party:{
        this.popUp = true;
        this.popUpHeading = DeliveryType.Third_Party_Title;
        this.popUpText = this.popUpData.Third_Party;
        break;
      }
      case DeliveryType.Dedicated:{
        this.popUp = true;
        this.popUpHeading = DeliveryType.Dedicated_Title;
        this.popUpText = this.popUpData.Dedicated;
        break;
      }
      case PackagingType.Premium:{
        this.popUp = true;
        this.popUpHeading = PackagingType.Premium_Title;
        this.popUpText = this.popUpData.Premium;
        break;
      }
      case PackagingType.Pocket_Friendly:{
        this.popUp = true;
        this.popUpHeading = PackagingType.Pocket_Friendly_Title;
        this.popUpText = this.popUpData.Pocket_Friendly;
        break;
      }
      case PackagingType.Basic:{
        this.popUp = true;
        this.popUpHeading = PackagingType.Basic_Title;
        this.popUpText = this.popUpData.Basic;
        break;
      }
      case "Gift":{
        this.popPage = true;
        break;
      }
    }
  }
  closePopUp(event:any){
    this.popUp = event;
  }

  popPageData(data:any){
    this.GiftMessage = data;
  }
  ClosePopPage(close:boolean){
    this.popPage = false;
  }
}
