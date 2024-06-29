import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router} from '@angular/router';
import { LoaderComponent } from "../../components/loader/loader.component";
import { CustomerSigninService } from '../../Services/customer-signin.service';

@Component({
    selector: 'app-otp',
    standalone: true,
    templateUrl: './otp.component.html',
    styleUrl: './otp.component.css',
    imports: [ReactiveFormsModule, RouterLink, LoaderComponent]
})
export class OTPComponent{
  OTPForm!: FormGroup;
  CustomerOTP:number | null = null;
  loader:boolean=false;

  constructor(private router: Router, private customerSigninService:CustomerSigninService){
    this.CreateForms();
    this.CheckForTheValue()
  }

  CheckForTheValue(){
    this.CustomerOTP = this.customerSigninService.GetOTP();
    if(!(this.CustomerOTP)){
      this.router.navigate(["/signup"]);
    }
  }

  CreateForms(){
    this.OTPForm = new FormGroup({
      otp: new FormControl('', [Validators.required,Validators.minLength(6)])
    });
  }

  verifyOTP(){
    this.loader=true;

    if(this.OTPForm.invalid){
      this.loader=false;
      alert("Not a valid OTP");
    }
    else{
      if(this.OTPForm.get('otp')?.value==this.CustomerOTP){
        let posted = this.customerSigninService.PostUserData();
        if(posted){
          this.customerSigninService.ClearAll();
          this.router.navigate(["/login"]);
        }
        else{
          alert("Error occurred try again later");
          this.customerSigninService.ClearAll();
          this.router.navigate(["/signup"]);
        }
      }
      else{
        alert("Wrong OTP Entered");
      }
      this.loader=false;
    }
  }
  
}
