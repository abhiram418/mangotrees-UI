import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [NgIf],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  ShowCode:boolean=false;

  constructor(private router:Router){}
  
  code(){
    this.ShowCode = !this.ShowCode;
  }

  SignUp(){
    this.router.navigate(['signup']);
  }

}
