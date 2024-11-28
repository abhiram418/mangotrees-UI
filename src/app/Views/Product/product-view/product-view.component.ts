import { Component } from '@angular/core';
import { DatePipe, Location, NgFor, NgIf } from '@angular/common';
import { FooterComponent } from "../../components/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { NavBarData } from '@models/navBarData';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { ActivatedRoute, Router } from '@angular/router';
import { PopPageComponent } from "../../components/pop-page/pop-page.component";
import { CustomerData } from '@models/CustomerData';
import { AddressDesc } from '@models/CustomerProfileData';
import { ProductInfo, ProductReviewData, ProductViewItemData, RipenessLevel } from '@models/ProductViewItemData';
import { SliderComponent } from "../../components/slider/slider.component";
import { ProductDataService } from '@services/Product/product-data.service';
import { ProductApiData } from '@models/ApiModels/ProductData';
import { LoaderComponent } from "../../components/loader/loader.component";

@Component({
    selector: 'app-product-view',
    standalone: true,
    templateUrl: './product-view.component.html',
    styleUrl: './product-view.component.css',
    imports: [NgFor, NgIf, DatePipe, FormsModule, FooterComponent, NavBarComponent, PopPageComponent, SliderComponent, LoaderComponent]
})
export class ProductViewComponent {
  navBarData = new NavBarData();
  test = true;
  info:any = [{Product_Info:false},{Product_Review:false},{Nutrition_Facts:false}];
  customerData:CustomerData = new CustomerData();
  addressesList:AddressDesc[] =[];

  productId: string = '';
  productViewItemData!:ProductViewItemData;
  ProductApiData!: ProductApiData;
  largeImage!: string;
  popPage:boolean = false;
  loader:boolean = true;
  

  temp:number | undefined;

  options = [
    { id: 0, value: "QTY", disabled: true },
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 },
    { id: 6, value: 6 },
    { id: 7, value: 7 },
    { id: 8, value: 8 },
    { id: 9, value: 9 },
    { id: 10, value: 10 },
    { id: 11, value: 11 },
    { id: 12, value: 12 }
  ];

  constructor(private productDataService: ProductDataService, private location: Location, private route: ActivatedRoute, private router: Router){
    this.GetProductFullData();

    var tempAddress1 = new AddressDesc();
    tempAddress1.AddressTitle = "Abhiram";
    tempAddress1.Address = "House no :- 7/263/1 banginapalli thota";
    tempAddress1.City = "NUZVID";
    tempAddress1.State = "ANDHRA PRADESH";
    tempAddress1.IsPrimary = true;
    this.addressesList.push(tempAddress1);
    var tempAddress2 = new AddressDesc();
    tempAddress2.AddressTitle = "Abhiram1";
    tempAddress2.Address = "House no :- 7/263/1 banginapalli thota";
    tempAddress2.City = "NUZVID";
    tempAddress2.State = "ANDHRA PRADESH";
    this.addressesList.push(tempAddress2);

    this.temp = this.options[0].id;
  }

  GetProductFullData(){
    this.productId = this.route.snapshot.paramMap.get('ProductID')?? "";

    if(this.productId != null || this.productId != ""){
      this.CallTheProductData();
    }
    else{
      if (window.history.length > 1) {
        this.location.back()
      } else {
        this.router.navigate(["home"]);
      }
    }
  }

  CallTheProductData(){
    this.productDataService.GetProductInfoData(this.productId).subscribe(
      result =>{
        this.loader = false;
        this.BuildProductData(result);
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

  BuildProductData(productData: any){
    this.productViewItemData = new ProductViewItemData();
    this.productViewItemData.ProductInfo = new ProductInfo();

    this.productViewItemData.ProductId = productData.productData.productId;
    this.productViewItemData.Images = productData.productData.images;
    this.largeImage = productData.productData.images[0];
    this.productViewItemData.Title = productData.productData.productTitle;
    this.productViewItemData.Desc = productData.productData.productDesc;
    this.productViewItemData.Price = productData.productData.price;
    this.productViewItemData.InventoryId = productData.productData.inventoryId;
    this.productViewItemData.Availability = productData.productData.availability;
    this.productViewItemData.AvailabilityTitle = productData.productData.availabilityTitle;
    this.productViewItemData.Stars = productData.productData.stars;
    this.productViewItemData.NumberOfRating = productData.productData.numberOfRatings;
    
    this.productViewItemData.DealTitle = productData.productData.dealTitle;
    this.productViewItemData.Discount = productData.productData.discount;
    this.productViewItemData.SalePrice = productData.productData.salePrice;

    this.productViewItemData.ProductInfo.NumberOfMangoes = productData.productInfo.numberOfMangoes;
    this.productViewItemData.ProductInfo.RipenessLevel = productData.productInfo.ripenessLevel;
    this.productViewItemData.ProductInfo.StorageInstructions = productData.productInfo.storageInstructions;
    this.productViewItemData.ProductInfo.Variety = productData.productInfo.variety;
    this.productViewItemData.ProductInfo.Weight = productData.productInfo.weight;
    
    this.productViewItemData.ProductReviewData = this.BuildProductReviewData(productData.productReviewData);
    this.productViewItemData.NutritionFacts = this.BuildNutritionFactsData(productData.productData?.nutritionFacts);
  }

  BuildNutritionFactsData(nutritionFacts: string[]): string[] | null{
    if(nutritionFacts.length == 0){
      return null;
    }
    else{
      return nutritionFacts;
    }
  }

  BuildProductReviewData(ReviewsData: any[]): ProductReviewData[]| null{
    var reviewsList: ProductReviewData[] = [];
    
    if( ReviewsData.length == 0){
      return null;
    }

    for (let index = 0; index < ReviewsData.length; index++) {
      var review = new ProductReviewData();
      review.ReviewerName = ReviewsData[index].reviewerName;
      review.Title = ReviewsData[index].title;
      review.Review = ReviewsData[index].review;
      review.Rating = ReviewsData[index].rating;
      review.Date = ReviewsData[index].date;

      reviewsList[index] = review;
    }
    
    return reviewsList;
  }

  ImageSelectedForLargeView(src: string){
    this.largeImage = src;
  }


  BuyNow(){
    this.router.navigate(["../review"]);
  }
  AddToCart(){
    this.router.navigate(["../cart"]);
  }


  showMoreOfDiv(what:string){
    if(what == "Product Review"){
      this.info.Product_Review = !this.info.Product_Review;
    }
    if(what == "Product Info"){
      this.info.Product_Info = !this.info.Product_Info;
    }
    if(what == "Nutrition Facts"){
      this.info.Nutrition_Facts = !this.info.Nutrition_Facts;
    }
  }

  SelectAddress(){
    this.popPage = true;
  }

  popPageData(data:any){
    console.log(data);
  }
  ClosePopPage(close:boolean){
    this.popPage = false;
  }




  RedirectTo(to:string){
    alert("to: "+to);
    this.router.navigate(['/'+to]);
  }
  Search(word:string){
    alert("search: "+ word);
  }
}
