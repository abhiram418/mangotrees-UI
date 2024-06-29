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
      FirstName: new FormControl('aaaaaaaaaaaa', [Validators.required,Validators.minLength(4)]),
      LastName: new FormControl('aaaaaaaaaaaa', [Validators.required,Validators.minLength(3)]),
      PhoneNumber: new FormControl('1111111111', [Validators.required,Validators.minLength(10),NumberValidator]),
      Email: new FormControl(null, [Validators.email]),
      UserName: new FormControl('aaaaaaaaaaaa', [Validators.required,Validators.minLength(6)]),
      Password: new FormControl('aaaaaaaaaaaa', [Validators.required,Validators.minLength(5)]),
      AddressDesc: new FormGroup({
        Address: new FormControl('aaaaaaaaaaaa', [Validators.required,Validators.minLength(6)]),
        Pincode: new FormControl('212123', [Validators.required,Validators.minLength(6),NumberValidator]),
        City: new FormControl('aaaaaaaaaaaa', [Validators.required,Validators.minLength(4)]),
        State: new FormControl('aaaaaaaaaaaa', [Validators.required,Validators.minLength(3)]),
      }),
      Occupation: new FormControl('aaaaaaaaaaaa', [Validators.required,Validators.minLength(5)]),
      Conditions: new FormControl(true, Validators.required)
    });
  }


  SignUp(){

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
      if(this.customerSigninService.UserNameAvailability(this.SignInForm.get("UserName")?.value)){
        if(this.customerSigninService.PhoneNumberAvailability(this.SignInForm.get("PhoneNumber")?.value)){
          this.customerSigninService.StoreUserData(this.SignInForm.value);
          
          this.router.navigate(["/otp"]);
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
