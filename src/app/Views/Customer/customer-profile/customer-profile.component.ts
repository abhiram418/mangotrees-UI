import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { NavBarData } from '@models/navBarData';
import { Router } from '@angular/router';
import { CustomerAuthenticationService } from '@services/Customer/customer-authentication.service';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [FooterComponent, NavBarComponent],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.css'
})
export class CustomerProfileComponent {

  constructor(private customerAuthenticationService: CustomerAuthenticationService, private router: Router){}

  LogOutOfMangoTrees(){
    this.customerAuthenticationService.ClearToken();
    this.RedirectTo("login");
  }

  RedirectTo(to:string){
    this.router.navigate(['/'+to]);
  }
  Search(word:string){
    alert("search: "+ word);
  }
}
