import { Component } from '@angular/core';
import { PopUpComponent } from "../../components/pop-up/pop-up.component";
import { NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeliveryType, PackagingType, PopUpData } from '../../../Models/PopUpData';

@Component({
  selector: 'app-review-delivery-page',
  standalone: true,
  imports: [PopUpComponent,ReactiveFormsModule , NgIf],
  templateUrl: './review-delivery-page.component.html',
  styleUrl: './review-delivery-page.component.css'
})
export class ReviewDeliveryPageComponent {
  popUp:boolean=false;
  popUpData:PopUpData = new PopUpData();
  popUpHeading:string="";
  popUpText:string="";
  ReviewForm!: FormGroup;

  constructor(private router: Router){}
  ngOnInit(): void {
    this.ReviewForm = new FormGroup({
      deliveryOption: new FormControl('', [Validators.required]),
      packageOption: new FormControl('', [Validators.required])
    });
  }

  proceedButtonClicked(){
    if(this.ReviewForm.valid){
      console.log(this.ReviewForm.value);
      this.router.navigate(["../checkout"]);
    }
    else{
      alert("Please Validate the Fields");
    }
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
    }
  }
  closePopUp(event:any){
    this.popUp = event;
  }
}
