import { Component, HostListener } from '@angular/core';
import { GridViewItemComponent } from "../../components/grid-view-item/grid-view-item.component";
import { NavBarData } from '@models/navBarData';
import { Location, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ProductViewItemData } from '@models/ProductViewItemData';
import { HomePageDataService } from '@services/Product/home-page-data.service';
import { LoaderComponent } from "../../components/loader/loader.component";
import { ProductApiData, ProductItemApiData } from '@models/ApiModels/ProductData';
import { ApiRequestsService } from '@services/api-requests.service';
import { ProductDataService } from '@services/Product/product-data.service';

@Component({
  selector: 'app-collections-page',
  standalone: true,
  imports: [NgIf, NgFor, GridViewItemComponent, NavBarComponent, FooterComponent, LoaderComponent],
  templateUrl: './collections-page.component.html',
  styleUrl: './collections-page.component.css'
})
export class CollectionsPageComponent {
  loader:boolean = false;
  navBarData = new NavBarData();
  PinchData:ProductItemApiData[]= [];
  allProductData:ProductApiData[]= null!;
  price:boolean = false;
  availability:boolean = false;

  constructor(private router: Router, private location: Location, private productDataService:ProductDataService){
    this.getTheProductData();
  }

  getTheProductData(){
    if(this.loader == true){
      return;
    }

    this.loader = true;
    this.productDataService.GetAllTheData().subscribe(
      result =>{
        this.loader = false;
        this.PinchData = this.BuildProductItemData(result);
        console.log(this.PinchData);
      },
      error =>{
        this.loader = false;
        alert("Products Data loading failed, please try again later");
        if (window.history.length > 1) {
          this.location.back()
        } else {
          this.router.navigate(["home"]);
        }
      }
    );
  }

  BuildProductItemData(ProductData:any): ProductItemApiData[]{
    var ProductList: ProductItemApiData[] = [];
    for (let index = 0; index < ProductData.length; index++) {
      ProductList[index] = new ProductItemApiData();
      ProductList[index].ProductId = ProductData[index].productId;
      ProductList[index].Image = ProductData[index].images[0];
      ProductList[index].Title = ProductData[index].productTitle;
      ProductList[index].Desc = ProductData[index].productDesc;
      ProductList[index].Price = ProductData[index].price;
      ProductList[index].Stars = ProductData[index].stars;
      ProductList[index].NumberOfRating = ProductData[index].numberOfRatings;
      ProductList[index].Availability = ProductData[index].availability;
      ProductList[index].DealTitle = ProductData[index]?.dealTitle;
      ProductList[index].Discount = ProductData[index]?.discount;
      ProductList[index].SalePrice = ProductData[index]?.salePrice;
    }
    return ProductList;
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
