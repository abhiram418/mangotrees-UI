import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router} from '@angular/router';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from "../components/loader/loader.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-login-page',
    standalone: true,
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.css',
    imports: [NgIf, RouterLink, LoaderComponent, ReactiveFormsModule]
})
export class LoginPageComponent {
  LoginForm!: FormGroup;
  ShowCode:boolean=false;
  loader:boolean=false;

  constructor(private router:Router){
    this.CreateForms();
  }
  
  CreateForms(){
    this.LoginForm = new FormGroup({
      UserName: new FormControl('', [Validators.required,Validators.minLength(5)]),
      Password: new FormControl('', [Validators.required,Validators.minLength(5)]),
      SecretKey: new FormControl('')
    });
  }

  SecretCode(){
    this.ShowCode = !this.ShowCode;
  }


  LogIn(){
    console.log(this.LoginForm.value);
    
    this.loader=true;
    if(this.LoginForm.invalid){
      alert("Please Enter the Credentials");
      this.loader=false;
    }
    else{
      if(this.LoginForm.get('UserName')?.value == "abhiram"){
        this.loader=false;
        this.router.navigate(["../home"]);
      }
      else{
        this.loader=false;
        alert("Wrong Credentials");
      }
    }
  }

}
