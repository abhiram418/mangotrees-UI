import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavBarData } from '@models/navBarData';
import { CustomerAuthenticationService } from '@services/Customer/customer-authentication.service';
import { NavBarService } from '@services/General/nav-bar.service';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  navBarData: NavBarData | null = null;
  @Output() redirectTo = new EventEmitter<any>();
  @Output() search = new EventEmitter<any>();

  constructor(private navBarService:NavBarService, private customerAuthenticationService: CustomerAuthenticationService){ }

  ngOnInit(): void {
    this.navBarService.GetNavBarData().subscribe((data) => {
      this.navBarData = data;
    });
  }


  RedirectTo(to:string){
    this.redirectTo.emit(to);
  }

  Search(){
    this.search.emit('search');
  }
  
}
