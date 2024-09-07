import { Component } from '@angular/core';
import { GridViewItemComponent } from "../../components/grid-view-item/grid-view-item.component";
import { NavBarData } from '../../components/nav-bar/navBarData';
import { NgFor, NgIf } from '@angular/common';
import { ProductViewItemData } from '../../Models/ProductViewItemData';
import { Router } from '@angular/router';
import { HomePageDataService } from '../../Services/home-page-data.service';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-collections-page',
  standalone: true,
  imports: [NgIf, NgFor, GridViewItemComponent, NavBarComponent, FooterComponent],
  templateUrl: './collections-page.component.html',
  styleUrl: './collections-page.component.css'
})
export class CollectionsPageComponent {
  navBarData = new NavBarData();
  PinchData:ProductViewItemData[]= null!;
  price:boolean = false;
  availability:boolean = false;

  constructor(private router: Router, private homePageDataService:HomePageDataService){
    this.PinchData = homePageDataService.GetNewPinchData();
  }

  showTheDiv(show:string){
    if(show == "price"){
      this.price = true;
    }
    else{
      this.availability = true;
    }
  }
  hideTheDiv(){
    alert("");
    this.price = false;
    this.availability = false;
  }

  AddedtoCart(IteamId:any){
    // alert(IteamId);
    this.navBarData.CartCount++;
  }
  ViewProduct(IteamId:string){
    alert("View: "+IteamId);
  }

  RedirectTo(to:string){
    alert("to: "+to);
    this.router.navigate(['/'+to]);
  }
  Search(word:string){
    alert("search: "+ word);
  }
}
