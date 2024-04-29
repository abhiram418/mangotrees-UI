import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { LoaderComponent } from "../components/loader/loader.component";
import { FooterComponent } from "../components/footer/footer.component";

@Component({
    selector: 'app-signin-up-page',
    standalone: true,
    templateUrl: './signin-up-page.component.html',
    styleUrl: './signin-up-page.component.css',
    imports: [NgIf, LoaderComponent, FooterComponent]
})
export class SigninUpPageComponent {
  loader:boolean=false;

  SignUp(){
    this.loader=true;
  }
}
