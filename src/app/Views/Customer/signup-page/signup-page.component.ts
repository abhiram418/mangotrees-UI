import { Component } from '@angular/core';
import { PopPageComponent } from "../../components/pop-page/pop-page.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [NgIf, PopPageComponent],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {
  popPage:boolean = false;

  signup(){
    this.popPage = true;
  }

  popPageData(data:any){
    console.log(data);
  }
  ClosePopPage(close:boolean){
    this.popPage = false;
  }
}
