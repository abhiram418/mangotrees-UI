import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CustomerSigninService } from '@services/Customer/customer-signin.service';
import { CustomerAuthenticationService } from '@services/Customer/customer-authentication.service';

@Component({
    selector: 'app-login-page',
    standalone: true,
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.css',
    imports: [NgIf, RouterLink, LoaderComponent, ReactiveFormsModule]
})
export class LoginPageComponent {
    loader:boolean = false;
    loginForm!: FormGroup;

    constructor(private customerSigninService: CustomerSigninService, private customerAuthenticationService:CustomerAuthenticationService,private route: ActivatedRoute, private router: Router){}
    
    ngOnInit(): void {
      this.loginForm = new FormGroup({
        UserName: new FormControl('', [Validators.required, Validators.minLength(5)]),
        Password: new FormControl('', [Validators.required, Validators.minLength(5)])
      });
    }

    SubmitLoginData(): void {
      if(this.loader){
        return;
      }
      
      if (this.loginForm.valid) {
        this.loader = true;
        
        this.customerSigninService.UserLogin(this.loginForm.value).subscribe(
          result => {
            this.loader = false;
            console.log(result);
            if(result?.token != null){
              this.customerAuthenticationService.SaveToken(result.token);
              this.TheCustomerIsLogedin();
            }
            else{
              alert("Login failed, Please try again later");
            }
          },
          error => {
            this.loader = false;
            if(error?.status == 401){
              this.customerAuthenticationService.ClearToken();
              alert("We couldn’t log you in with the details provided. Need help? Click 'Forgot Password' or reach out to our support team.");
            }
            else{
              alert("Login failed, Please try again later");
            }
          }
        );
      } 
      else {
        if (!this.loginForm.controls['UserName'].value && !this.loginForm.controls['Password'].value) {
          alert("Please enter both your username and password to proceed.");
        } 
        else if (!this.loginForm.controls['UserName'].value || !this.loginForm.controls['Password'].value) {
          alert("It seems like one of the fields is empty. Please fill out all fields to continue.");
        }
      }
    }

    TheCustomerIsLogedin(){
      this.customerAuthenticationService.RetrieveCustomerData();
      
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] ?? '/home';
      this.router.navigate([returnUrl]);
    }
}
