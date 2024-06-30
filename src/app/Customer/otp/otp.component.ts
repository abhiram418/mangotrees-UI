import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router} from '@angular/router';
import { LoaderComponent } from "../../components/loader/loader.component";
import { CustomerSigninService } from '../../Services/customer-signin.service';
import { ResetPasswordService } from '../../Services/reset-password.service';

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
  PageName:string | null=null;

  constructor(private router: Router,private snap: ActivatedRoute, private customerSigninService:CustomerSigninService, private resetPasswordService:ResetPasswordService){
    this.CreateForms();
    this.GetPageName()
    this.CheckForTheValue()
  }

  CreateForms(){
    this.OTPForm = new FormGroup({
      otp: new FormControl('', [Validators.required,Validators.minLength(6)])
    });
  }

  GetPageName(){
    this.PageName = this.snap.snapshot.paramMap.get('PageName');
  }

  CheckForTheValue(){
    if(this.PageName == null){
      this.router.navigate(["/login"]);
    }
    else{
      if(this.PageName == "Reset Password"){
        this.CustomerOTP = this.resetPasswordService.GetOTP();
        if(!(this.CustomerOTP)){
          this.router.navigate(["/login"]);
        }
      }
      else{
        this.CustomerOTP = this.customerSigninService.GetOTP();
        if(!(this.CustomerOTP)){
          this.router.navigate(["/signup"]);
        }
      }
    }
  }



  verifyOTP(){
    this.loader=true;

    if(this.OTPForm.invalid){
      this.loader=false;
      alert("Not a valid OTP");
    }
    else{
      if(this.PageName == "Reset Password"){
        this.PostPasswordData();
      }
      else{
        this.PostUserData();
      }
    }
  }

  PostUserData(){
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
      this.loader=false;
      alert("Wrong OTP Entered");
    }
  }

  PostPasswordData(){
    if(this.OTPForm.get('otp')?.value==this.CustomerOTP){
      let posted = this.resetPasswordService.PostPasswordData();
      if(posted){
        this.resetPasswordService.ClearAll();
        this.router.navigate(["/login"]);
      }
      else{
        alert("Error occurred try again later");
        this.resetPasswordService.ClearAll();
        this.router.navigate(["/repassword"]);
      }
    }
    else{
      this.loader=false;
      alert("Wrong OTP Entered");
    }
  }
  
}
