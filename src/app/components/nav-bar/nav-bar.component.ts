import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  UserName:string="Abhiram";
  CityName:string="Nuzivid";
  Pincode:string="521201";
}
