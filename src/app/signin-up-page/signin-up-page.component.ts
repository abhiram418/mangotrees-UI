import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signin-up-page',
  standalone: true,
  imports: [NgIf],
  templateUrl: './signin-up-page.component.html',
  styleUrl: './signin-up-page.component.css'
})
export class SigninUpPageComponent {
  loader:boolean = false;

  async loaderCaller(){
    this.loader = true;
    setTimeout(()=>{
      this.loader = false;
    },5000); 
  }


  SignUp(){
    this.loaderCaller();

  }
}
