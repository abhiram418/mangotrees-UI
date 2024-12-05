import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { Router } from '@angular/router';
import { NgIf, NgStyle } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerSigninService } from '@services/Customer/customer-signin.service';
import { CustomerDetailsApiData } from '@models/ApiModels/CustomerData';
import { CustomerAuthenticationService } from '@services/Customer/customer-authentication.service';
import { LoaderComponent } from "../../components/loader/loader.component";

@Component({
  selector: 'app-customer-personal-details',
  standalone: true,
  imports: [NgIf, NgStyle, RouterLink, ReactiveFormsModule, NavBarComponent, LoaderComponent],
  templateUrl: './customer-personal-details.component.html',
  styleUrl: './customer-personal-details.component.css'
})
export class CustomerPersonalDetailsComponent {
  customerData:CustomerDetailsApiData | null = new CustomerDetailsApiData();
  customerDetailsForm!: FormGroup;
  Editable:boolean = false;
  loader:boolean = true;

  constructor(private customerSigninService: CustomerSigninService, private customerAuthenticationService: CustomerAuthenticationService, private router: Router){}
  ngOnInit(): void {
    this.customerAuthenticationService.GetCustomerData().subscribe((data) => {
      this.customerData = data!;
      this.CreateCustomerDetailsForm();
    });
  }

  CreateCustomerDetailsForm(){
    this.customerDetailsForm = new FormGroup({
      FirstName: new FormControl(this.customerData?.FirstName!, [Validators.required, Validators.minLength(3)]),
      LastName: new FormControl(this.customerData?.LastName!, [Validators.required, Validators.minLength(3)]),
      Gender: new FormControl(this.customerData?.Gender!, [Validators.required]),
      Email: new FormControl(this.customerData?.Email!, [Validators.required, Validators.email])
    });
    this.customerDetailsForm.disable();
    this.loader = false;
  }

  PostTheUpdatedCustomerDetailsData(customerDetails : any){
    this.customerSigninService.UpdateCustomerDetailsData(customerDetails).subscribe(
      result=>{
        this.loader = false;
        this.customerAuthenticationService.RetrieveCustomerData();
      },
      error=>{
        this.loader = false;
        alert("Unable to update Customer Details, Please try again later.")
      }
    );
  }

  editButtonClicked(){
    this.Editable = !this.Editable;
    this.customerDetailsForm.enable();
  }
  saveButtonClicked(){
    if(this.customerDetailsForm.valid){
      this.loader = true;
      this.Editable = !this.Editable;
      this.customerDetailsForm.disable();

      this.PostTheUpdatedCustomerDetailsData(this.customerDetailsForm.value);
    }
    else{
      alert("Please Validate the Fields");
    }
  }

  RedirectTo(to:string){
    this.router.navigate(['/'+to]);
  }
  Search(word:string){
    alert("search: "+ word);
  }
}
