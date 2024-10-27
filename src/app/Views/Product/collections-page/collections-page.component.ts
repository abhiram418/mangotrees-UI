import { Component, HostListener } from '@angular/core';
import { GridViewItemComponent } from "../../components/grid-view-item/grid-view-item.component";
import { NavBarData } from '@models/navBarData';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ProductViewItemData } from '@models/ProductViewItemData';
import { HomePageDataService } from '@services/Product/home-page-data.service';

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
  hideTheDiv(hide:string){
    if(hide == "availability"){
      this.availability = false;
    }
    else{
      this.price = false;
    }
  }

  AddedtoCart(IteamId:any){
    // alert(IteamId);
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

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    var targetElement = event.target as HTMLElement;
    var isPriceClicked = targetElement.closest('.price');
    var isAvailabilityClicked = targetElement.closest('.availability');
    
    if (!isPriceClicked) {
      this.hideTheDiv("price");
    }
    if(!isAvailabilityClicked){
      this.hideTheDiv("availability");
    }
  }
}
