import { Component } from '@angular/core';
import { PopPageComponent } from "../../components/pop-page/pop-page.component";
import { NgIf } from '@angular/common';
import { CustomerSigninService } from '@services/Customer/customer-signin.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderComponent } from "../../components/loader/loader.component";
import { ResetPasswordModel } from '@models/CustomerData';

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [NgIf, PopPageComponent, ReactiveFormsModule, LoaderComponent],
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.css'
})
export class ForgotPasswordPageComponent {
  loader:boolean = false;
  popPage:boolean = false;
  passwordForm!: FormGroup;
  resetPasswordModel!: ResetPasswordModel;

  constructor(private customerSigninService: CustomerSigninService, private router: Router){}
    
  ngOnInit(): void {
    this.passwordForm = new FormGroup({
      PhoneNumber: new FormControl('', [Validators.required,  Validators.pattern('^[0-9]{10}$'), Validators.minLength(10), Validators.maxLength(10)]),
      Password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      ReEnterPassword: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  SubmitResetPasswordOTP(){
    if(this.loader){
      return;
    }

    const phoneNumber = this.passwordForm.controls['PhoneNumber'].value;
    const password = this.passwordForm.controls['Password'].value;
    const reEnterPassword = this.passwordForm.controls['ReEnterPassword'].value;

    if(this.passwordForm.valid){
      if (password !== reEnterPassword) {
        alert("Passwords do not match. Please re-enter your password.");
      }
      else{
        this.loader = true;

        this.customerSigninService.ResetCustomerPasswordRequest(this.passwordForm.value.PhoneNumber).subscribe(
          result =>{
            this.popPage = true;
            this.loader = false;
          },
          error =>{
            this.popPage = false;
            this.loader = false;
            alert("The phone number you entered is not registered with MangoTrees. Please double-check and try again.");
          }
        );
      }
    }
    else{
      if (!phoneNumber) {
        alert("Please enter your phone number.");
      } else if (!password) {
        alert("Please enter your password.");
      } else if (!reEnterPassword) {
        alert("Please confirm your password by re-entering it.");
      } else {
        alert("Please ensure all fields meet the required conditions.");
      }
    }
  }

  ResetCustomerPasswordWithOTP(otp: string){
    if(this.loader){
      return;
    }
    
    this.resetPasswordModel = new ResetPasswordModel();
    this.resetPasswordModel.PhoneNumber = this.passwordForm.controls['PhoneNumber'].value;
    this.resetPasswordModel.Password = this.passwordForm.controls['Password'].value;
    this.resetPasswordModel.OTP = otp;

    this.customerSigninService.ResetCustomerPassword(this.resetPasswordModel).subscribe(
      result =>{
        this.loader = false;
      },
      error =>{
        this.loader = false;
        alert("The phone number you entered is not registered with MangoTrees. Please double-check and try again.");
      }
    );
  }
  
  popPageData(data:any){
    this.loader = true;
    this.ResetCustomerPasswordWithOTP(data);
  }
  ClosePopPage(close:boolean){
    this.popPage = false;
  }
}
