import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { LoaderComponent } from "../../components/loader/loader.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomerSigninService } from '../../Services/customer-signin.service';


export function NumberValidator(control: AbstractControl): ValidationErrors | null {
  if (isNaN(control.value)) {
    return { notANumber: true };
  }
  return null;
}


@Component({
    selector: 'app-signin-up-page',
    standalone: true,
    templateUrl: './signin-up-page.component.html',
    styleUrl: './signin-up-page.component.css',
    imports: [NgIf, RouterLink, LoaderComponent, FooterComponent, ReactiveFormsModule]
})
export class SigninUpPageComponent {
  loader:boolean=false;
  SignInForm! : FormGroup;

  constructor(private router:Router, private customerSigninService:CustomerSigninService){
    this.CreateForms();
  }

  CreateForms(){
    this.SignInForm = new FormGroup({
      FirstName: new FormControl('', [Validators.required,Validators.minLength(4),Validators.maxLength(10)]),
      LastName: new FormControl('', [Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
      PhoneNumber: new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10),NumberValidator]),
      Email: new FormControl(null, [Validators.email,Validators.maxLength(50)]),
      UserName: new FormControl('', [Validators.required,Validators.minLength(6),Validators.maxLength(16)]),
      Password: new FormControl('', [Validators.required,Validators.minLength(5),Validators.maxLength(16)]),
      AddressDesc: new FormGroup({
        Address: new FormControl('', [Validators.required,Validators.minLength(6),Validators.maxLength(50)]),
        Pincode: new FormControl('', [Validators.required,Validators.minLength(6),Validators.maxLength(6),NumberValidator]),
        City: new FormControl('', [Validators.required,Validators.minLength(4),Validators.maxLength(30)]),
        State: new FormControl('', [Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
      }),
      Occupation: new FormControl('', [Validators.required,Validators.minLength(5),Validators.maxLength(10)]),
      Conditions: new FormControl(false, Validators.required)
    });
  }


  async SignUp(){

    this.loader=true;
    if(this.SignInForm.invalid){
      this.loader = false;
      alert("Please Enter The Data Correctly");
    }
    else if(this.SignInForm.get("Conditions")?.value == false){
      this.loader = false;
      alert("Please look into the Terms & Conditions");
    }
    else{
      if(await this.customerSigninService.UserNameAvailability(this.SignInForm.get("UserName")?.value)){
        if(await this.customerSigninService.PhoneNumberAvailability(this.SignInForm.get("PhoneNumber")?.value)){
          this.customerSigninService.StoreUserData(this.SignInForm.value);
          let PageName = "Signin"
          this.router.navigate(["/otp", {PageName:PageName}]);
        }
        else{
          this.loader = false;
          alert("Phone Number is not valid or already registered");
        }
      }
      else{
        this.loader = false;
        alert("User Name is already taken");
      }
    }
  }
}
