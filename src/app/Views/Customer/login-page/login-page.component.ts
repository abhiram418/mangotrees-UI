import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
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

    constructor(private customerSigninService: CustomerSigninService, private customerAuthenticationService:CustomerAuthenticationService){}
    
    ngOnInit(): void {
      this.loginForm = new FormGroup({
        UserName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        Password: new FormControl('', [Validators.required, Validators.minLength(3)])
      });
    }

    SubmitLoginData(): void {
      if (this.loginForm.valid) {
        this.customerSigninService.UserLogin(this.loginForm.value).subscribe(
            result => {
              this.customerAuthenticationService.TokenHandler(result);
            },
            error => {
              console.log(error)
            }
        );
      } 
      else {
        console.log('Invalid form');
      }
    }
    
}
