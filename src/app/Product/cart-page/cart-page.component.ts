import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { NavBarData } from '../../components/nav-bar/navBarData';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [NgFor, RouterLink, NavBarComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  navBarData:NavBarData = new NavBarData();
  count:number = 1;
  templist:any[] = [1,23,4,5,5,6,7,8,8,9,9,99,2,9,9];
  templist1:any[] = [1,2,3];

  constructor(private router:Router){

  }


  countIncrease(){
    this.count++;
  }
  countDecrease(){
    this.count--;
  }

  ContinueButtonClicked(){
    this.router.navigate(["../review"]);
  }

  RedirectTo(to:string){
    alert("to: "+to);
    this.router.navigate(['/'+to]);
  }
  Search(word:string){
    alert("search: "+ word);
  }

}
