import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loader:boolean = false;
  ShowCode:boolean=false;

  constructor(private router:Router){}
  
  code(){
    this.ShowCode = !this.ShowCode;
  }

  async loaderCaller(){
    this.loader = true;
    setTimeout(()=>{
      this.loader = false;
    },5000);
  }

  LogIn(){
    this.loaderCaller();
    
  }

}
