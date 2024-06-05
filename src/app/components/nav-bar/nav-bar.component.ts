import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  UserName:string="Abhiram";
  CityName:string="Nuzivid";
  Pincode:string="521201";

  account_list:string[]=["Your Account","Your Orders","Your Recomendations"]
  account_list_show:boolean=false;


  show_account(){
    console.log(this.account_list_show);
    this.account_list_show=true;
  }
  hide_account(){
      console.log(this.account_list_show);
    this.account_list_show=false;
  }
  hide_account1(){
    alert('hide1');
    // console.log(this.account_list_show);
    // this.account_list_show=false;
  }
}
