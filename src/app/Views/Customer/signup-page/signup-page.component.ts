import { Component } from '@angular/core';
import { PopPageComponent } from "../../components/pop-page/pop-page.component";
import { NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRequestModel } from '@models/CustomerData';
import { CustomerSigninService } from '@services/Customer/customer-signin.service';
import { Router } from '@angular/router';
import { AddressDesc } from '@models/CustomerProfileData';
import { AppConstants } from '@models/StaticValues/GeneralStaticValues';
import { LoaderComponent } from "../../components/loader/loader.component";

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [NgIf, PopPageComponent, ReactiveFormsModule, LoaderComponent],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {
  loader:boolean = false;
  popPage:boolean = false;
  signupForm!: FormGroup;
  userRequestModel!: UserRequestModel;

  constructor(private customerSigninService: CustomerSigninService, private router: Router){}
    
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      FirstName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      LastName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
      Occupation: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      DateOfBirth: new FormControl('', [Validators.required]),
      Gender: new FormControl('', [Validators.required]),
      PhoneNumber: new FormControl('', [Validators.required,  Validators.pattern('^[0-9]{10}$'), Validators.minLength(10), Validators.maxLength(10)]),
      Email: new FormControl('', [Validators.email]),
      UserName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      Password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      Address: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
      Pincode: new FormControl('', [Validators.required,  Validators.pattern('^[0-9]{6}$'), Validators.minLength(6), Validators.maxLength(6)]),
      City: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      State: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
    });
  }

  SubmitSignupFormOTP(){
    if(this.loader){
      return;
    }

    if(this.signupForm.valid){
      this.loader = true;

      this.userRequestModel = new UserRequestModel();
      this.userRequestModel.FirstName = this.signupForm.get('FirstName')?.value;
      this.userRequestModel.LastName = this.signupForm.get('LastName')?.value;
      this.userRequestModel.Occupation = this.signupForm.get('Occupation')?.value;
      this.userRequestModel.DateOfBirth = this.signupForm.get('DateOfBirth')?.value;
      this.userRequestModel.Gender = this.signupForm.get('Gender')?.value;
      this.userRequestModel.PhoneNumber = this.signupForm.get('PhoneNumber')?.value;
      this.userRequestModel.Email = this.signupForm.get('Email')?.value;
      this.userRequestModel.Role = AppConstants.Customer_Role;
      this.userRequestModel.UserName = this.signupForm.get('UserName')?.value;
      this.userRequestModel.Password = this.signupForm.get('Password')?.value;
      this.userRequestModel.JoinDate = new Date();
      this.userRequestModel.Conditions = true;
      this.userRequestModel.Address = new AddressDesc();
      this.userRequestModel.Address.IsPrimary = true;
      this.userRequestModel.Address.AddressTitle = this.signupForm.get('FirstName')?.value;
      this.userRequestModel.Address.Address = this.signupForm.get('Address')?.value;
      this.userRequestModel.Address.Pincode = this.signupForm.get('Pincode')?.value;
      this.userRequestModel.Address.City = this.signupForm.get('City')?.value;
      this.userRequestModel.Address.State = this.signupForm.get('State')?.value;

      this.customerSigninService.RequestOTP(this.signupForm.value.PhoneNumber).subscribe(
        result =>{
          this.popPage = true;
          this.loader = false;
        },
        error =>{
          this.loader = false;
          if(error.status == 409){
            alert("It seems like you already have an account with MangoTrees. If you've forgotten your password, please click on 'Forgot Password' to reset it or log in with your existing credentials");
          }
          else{
            alert("Signup failed, please try again later");
          }
        }
      );
    }
    else{
      alert("Please fill in all required fields correctly before proceeding");
    }
  }

  PostCustomerDataWithOTP(otp: string){
    if(this.loader){
      return;
    }
    
    this.customerSigninService.SignupCustomer(this.userRequestModel, otp).subscribe(
      result =>{
        this.loader = false;
        alert(result.message);
        this.DoneWithCustomerSignedup();
      },
      error =>{
        this.loader = false;
        if(error.status == 409){
          alert("It seems like you already have an account with MangoTrees. If you've forgotten your password, please click on 'Forgot Password' to reset it or log in with your existing credentials");
        }
        else if (error.status == 410){
          alert("OTP Expired or Not Valid");
        }
        else{
          alert("Signup failed, please try again later");
        }
      }
    );
  }


  DoneWithCustomerSignedup(){
    this.router.navigate(["login"]);
  }

  popPageData(data:any){
    this.loader = true;
    this.PostCustomerDataWithOTP(data);
  }
  ClosePopPage(close:boolean){
    this.popPage = false;
  }
}
