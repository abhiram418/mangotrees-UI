import { Component } from '@angular/core';
import { FooterComponent } from "../components/footer/footer.component";
import { NavBarComponent } from "../components/nav-bar/nav-bar.component";
import { GridViewItemComponent } from "../components/grid-view-item/grid-view-item.component";
import { SliderComponent } from '../components/slider/slider.component';
import { NavBarData } from '../components/nav-bar/navBarData';
import { gridViewItemData } from '../components/grid-view-item/gridViewItemData';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FooterComponent, NavBarComponent, GridViewItemComponent, SliderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  navBarData = new NavBarData();
  productData = new gridViewItemData();
  productData1 = new gridViewItemData();

  constructor(){
    this.productData.DealTitle=null;
    this.productData.Discount=null;
    this.productData.SalePrice=null; 
    this.productData.OldPrice=null;
    // this.productData.price=null;
  }
  

  AddedtoCart(IteamId:any){
    alert(IteamId);
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
