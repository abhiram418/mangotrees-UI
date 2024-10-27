import { Component } from '@angular/core';
import { NavBarData } from '@models/navBarData';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { GridViewItemComponent } from '../../components/grid-view-item/grid-view-item.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductViewItemData } from '@models/ProductViewItemData';
import { HomePageDataService } from '@services/Product/home-page-data.service';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, FooterComponent, NavBarComponent, GridViewItemComponent, SliderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  navBarData = new NavBarData();
  PinchData:ProductViewItemData[]= null!;

  constructor(private router: Router, private homePageDataService:HomePageDataService){
    this.PinchData = homePageDataService.GetNewPinchData();
  }
  

  AddedtoCart(IteamId:any){
    alert(IteamId);
    this.navBarData.CartCount++;
  }
  ViewProduct(IteamId:string){
    alert("View: "+IteamId);
    this.router.navigate(['/product/'+IteamId]);
  }

  RedirectTo(to:string){
    alert("to: "+to);
    this.router.navigate(['/'+to]);
  }
  Search(word:string){
    alert("search: "+ word);
  }
}
