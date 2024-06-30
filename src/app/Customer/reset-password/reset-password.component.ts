import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderComponent } from "../../components/loader/loader.component";
import { NumberValidator } from '../signin-up-page/signin-up-page.component';
import { ResetPasswordService } from '../../Services/reset-password.service';

@Component({
    selector: 'app-reset-password',
    standalone: true,
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.css',
    imports: [LoaderComponent, ReactiveFormsModule]
})
export class ResetPasswordComponent {
  ResetPasswordForm!: FormGroup;
  loader:boolean=false;

  constructor(private router: Router, private resetPasswordService:ResetPasswordService){
    this.CreateForms();
  }

  CreateForms(){
    this.ResetPasswordForm = new FormGroup({
      PhoneNumber: new FormControl('', [Validators.required,Validators.minLength(10),NumberValidator]),
      Password: new FormControl('', [Validators.required,Validators.minLength(5)]),
      Re_Password: new FormControl('', [Validators.required]),
    });
  }

  async ResetPassword(){

    this.loader=true;
    if(this.ResetPasswordForm.invalid){
      this.loader = false;
      alert("Please Enter The valid Data");
    }
    else{
      if(await this.resetPasswordService.UserValidity(this.ResetPasswordForm.get('PhoneNumber')?.value)){
        this.resetPasswordService.StorePasswordData(this.ResetPasswordForm.value);
        let PageName = "Reset Password";
        this.router.navigate(["/otp", {PageName:PageName}]);
      }
      else{
        this.loader = false;
        alert("Enter a valid Phone Number");
      }
    }

  }
}
