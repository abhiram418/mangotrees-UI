import { Component } from '@angular/core';
import { PopPageComponent } from "../../components/pop-page/pop-page.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [NgIf, PopPageComponent],
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.css'
})
export class ForgotPasswordPageComponent {
  popPage:boolean = false;


  resetPassword(){
    this.popPage = true;
  }

  
  popPageData(data:any){
    console.log(data);
  }
  ClosePopPage(close:boolean){
    this.popPage = false;
  }
}
