import { Component, HostListener } from '@angular/core';
import { GridViewItemComponent } from "../../components/grid-view-item/grid-view-item.component";
import { CommonModule, Location, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { LoaderComponent } from "../../components/loader/loader.component";
import { ProductItemApiData } from '@models/ApiModels/ProductData';
import { ProductDataService } from '@services/Product/product-data.service';
import { CustomerCartSharedService } from '@services/Customer/customer-cart-shared.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-collections-page',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, FormsModule, GridViewItemComponent, NavBarComponent, FooterComponent, LoaderComponent],
  templateUrl: './collections-page.component.html',
  styleUrl: './collections-page.component.css'
})
export class CollectionsPageComponent {
  loader:boolean = false;
  searchWord: string | null = null;
  PinchData:ProductItemApiData[]= [];
  SortedPinchData:ProductItemApiData[]= [];
  inStockSelected: boolean = false;
  outOfStockSelected: boolean = false;
  SortCriteria: string = "Featured";
  highestPrice: number = 0; 
  minPrice: number = 0; 
  maxPrice: number = 0;
  // Filters Divs
  price:boolean = false;
  availability:boolean = false;

  constructor(private customerCartSharedService: CustomerCartSharedService, private route: ActivatedRoute, private router: Router, private location: Location, private productDataService:ProductDataService){
    this.getTheProductData();
  }
  ngOnInit() {
    this.searchWord = this.route.snapshot.queryParamMap.get('search');
  }

  getTheProductData(){
    if(this.loader == true){
      return;
    }

    this.loader = true;
    this.productDataService.GetAllTheData().subscribe(
      result =>{
        this.SortedPinchData = this.BuildProductItemData(result);
        this.PinchData = [...this.SortedPinchData];
        if(this.searchWord){
          this.FilterBySearchWord(this.searchWord);
        }
        this.highestPrice = this.calculateHighestPrice();
        this.loader = false;
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


  SortProductsBy() {
    switch (this.SortCriteria) {
      case "Price-high-low":
        this.SortedPinchData.sort((a, b) => b.Price - a.Price);
        break;
      case "Price-low-high":
        this.SortedPinchData.sort((a, b) => a.Price - b.Price);
        break;
      case "A-Z":
        this.SortedPinchData.sort((a, b) => a.Title.localeCompare(b.Title));
        break;
      case "Z-A":
        this.SortedPinchData.sort((a, b) => b.Title.localeCompare(a.Title));
        break;
      case "Featured":
        this.SortedPinchData = [...this.PinchData]; 
        this.FilterByAvailability();
        break;
      default:
        break;
    }
  }
  FilterByAvailability() {
    if (this.inStockSelected && this.outOfStockSelected) {
      this.SortedPinchData = [...this.PinchData];
      this.SortCriteria = "Featured";
    } else if (this.inStockSelected) {
      this.SortedPinchData = this.PinchData.filter(product => product.Availability === true);
    } else if (this.outOfStockSelected) {
      this.SortedPinchData = this.PinchData.filter(product => product.Availability === false);
    } else {
      this.SortedPinchData = [...this.PinchData];
      this.SortCriteria = "Featured";
    }
  }
  FilterByPriceRange() {
    this.SortedPinchData = [...this.PinchData];

    this.SortedPinchData = this.SortedPinchData.filter(product => {
      return product.Price >= this.minPrice && product.Price <= this.maxPrice;
    });

    this.SortCriteria = "Featured";
    this.inStockSelected = false;
    this.outOfStockSelected = false;
  }
  FilterBySearchWord(word: string) {
    const lowerCaseWord = word.toLowerCase();
    
    this.SortedPinchData = this.PinchData.filter(product => {
      return (
        product.Title.toLowerCase().includes(lowerCaseWord) ||
        product.Desc.toLowerCase().includes(lowerCaseWord)
      );
    });
  }

  calculateHighestPrice(): number {
    this.maxPrice = Math.max(...this.PinchData.map(product => product.Price));
    return this.maxPrice;
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
    this.customerCartSharedService.AddProductToTheCart(IteamId);
  }
  ViewProduct(IteamId:string){
    this.router.navigate(['/product'], { queryParams: { ProductID: IteamId } });
  }

  RedirectTo(to:string){
    this.router.navigate(['/'+to]);
  }
  Search(word:string){
    this.router.navigate(['/collections'], { queryParams: { search: word } });
    this.FilterBySearchWord(word);
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
