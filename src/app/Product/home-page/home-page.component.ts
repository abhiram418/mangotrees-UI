import { Component } from '@angular/core';
import { NavBarData } from '../../components/nav-bar/navBarData';
import { gridViewItemData } from '../../components/grid-view-item/gridViewItemData';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { GridViewItemComponent } from '../../components/grid-view-item/grid-view-item.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { HomePageDataService } from '../../Services/home-page-data.service';
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgFor, NgIf, FooterComponent, NavBarComponent, GridViewItemComponent, SliderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  navBarData = new NavBarData();
  PinchData:gridViewItemData[]= null!;

  constructor(private homePageDataService:HomePageDataService){
    this.PinchData = homePageDataService.GetNewPinchData()!;
  }
  

  AddedtoCart(IteamId:any){
    alert(IteamId);
    this.navBarData.CartCount++;
  }
  ViewProduct(IteamId:string){
    alert("View: "+IteamId);
  }

  RedirectTo(to:string){
    alert("to: "+to);
  }
  Search(word:string){
    alert("search: "+ word);
  }
}
