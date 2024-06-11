import { Component } from '@angular/core';
import { FooterComponent } from "../components/footer/footer.component";
import { NavBarComponent } from "../components/nav-bar/nav-bar.component";
import { GridViewItemComponent } from "../components/grid-view-item/grid-view-item.component";


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FooterComponent, NavBarComponent, GridViewItemComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
