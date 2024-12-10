import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { NavBarData } from '@models/navBarData';
import { Router } from '@angular/router';
import { CustomerAuthenticationService } from '@services/Customer/customer-authentication.service';
import { CustomerCartService } from '@services/Customer/customer-cart.service';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [FooterComponent, NavBarComponent],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.css'
})
export class CustomerProfileComponent {

  constructor(private customerCartService: CustomerCartService, private customerAuthenticationService: CustomerAuthenticationService, private router: Router){}

  LogOutOfMangoTrees(){
    this.customerAuthenticationService.ClearToken();
    this.customerCartService.ClearCartIdFromStorage();
    this.RedirectTo("login");
  }

  RedirectTo(to:string){
    this.router.navigate(['/'+to]);
  }
  Search(word:string){
    this.router.navigate(['/collections'], { queryParams: { search: word } });
  }
}
