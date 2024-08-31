import { Component } from '@angular/core';
import { NavBarData } from '../../components/nav-bar/navBarData';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { PopPageComponent } from "../../components/pop-page/pop-page.component";
import { NgIf } from '@angular/common';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-customer-address',
  standalone: true,
  imports: [NgIf, RouterLink, FooterComponent, NavBarComponent, PopPageComponent],
  templateUrl: './customer-address.component.html',
  styleUrl: './customer-address.component.css'
})
export class CustomerAddressComponent {
  navBarData:NavBarData = new NavBarData();
  Editable:boolean = false;
  popPage:boolean = false;
  editButtonClickedBy:number = 0;
  constructor(private router: Router){}



  editButtonClicked(id:number){
    this.popPage = true;
    this.editButtonClickedBy = id;
  }
  deleteButtonClicked(){}
  setPrimaryButtonClicked(){
    this.Editable = !this.Editable;
  }

  RedirectTo(to:string){
    alert("to: "+to);
    this.router.navigate(['../'+to]);
  }
  Search(word:string){
    alert("search: "+ word);
  }

  popPageData(data:any){
    var message:string = data ? JSON.stringify(data) : 'No data provided';
    alert(message + " by " + this.editButtonClickedBy);
  }
  ClosePopPage(close:boolean){
    this.popPage = false;
  }
}
