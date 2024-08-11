import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { NavBarData } from '../../components/nav-bar/navBarData';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [FooterComponent, NavBarComponent],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.css'
})
export class CustomerProfileComponent {
  navBarData:NavBarData= new NavBarData();


  RedirectTo(a:any){

  }
  Search(b:any){

  }
}
