import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { LoaderComponent } from "../components/loader/loader.component";
import { FooterComponent } from "../components/footer/footer.component";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


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

  constructor(private router:Router){
    this.CreateForms();
  }

  CreateForms(){
    this.SignInForm = new FormGroup({
      FirstName: new FormControl('', [Validators.required,Validators.minLength(4)]),
      LastName: new FormControl('', [Validators.required,Validators.minLength(3)]),
      PhoneNumber: new FormControl('', [Validators.required,Validators.minLength(10),NumberValidator]),
      Email: new FormControl('', [Validators.email]),
      UserName: new FormControl('', [Validators.required,Validators.minLength(5)]),
      Password: new FormControl('', [Validators.required,Validators.minLength(5)]),
      AddressDesc: new FormGroup({
        Address: new FormControl('', [Validators.required,Validators.minLength(6)]),
        Pincode: new FormControl('', [Validators.required,Validators.minLength(6),NumberValidator]),
        City: new FormControl('', [Validators.required,Validators.minLength(4)]),
        State: new FormControl('', [Validators.required,Validators.minLength(3)]),
      }),
      Occupation: new FormControl('', [Validators.required,Validators.minLength(5)])
    });
  }


  SignUp(){
    console.log(this.SignInForm.value);
    console.log(this.SignInForm.get("AddressDesc.Address")?.errors)

    this.loader=true;
    if(this.SignInForm.invalid){
      this.loader = false;
      alert("Please Enter The Data Correctly");
    }
    else{
      //post the data
      this.loader=false;
      alert("data ");
    }
  }
}
