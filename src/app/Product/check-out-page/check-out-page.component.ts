import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { NavBarData } from '../../components/nav-bar/navBarData';

@Component({
  selector: 'app-check-out-page',
  standalone: true,
  imports: [FooterComponent, NavBarComponent],
  templateUrl: './check-out-page.component.html',
  styleUrl: './check-out-page.component.css'
})
export class CheckOutPageComponent {
  
}
