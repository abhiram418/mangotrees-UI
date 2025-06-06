import { Component } from '@angular/core';
import { DatePipe, Location, NgFor, NgIf } from '@angular/common';
import { FooterComponent } from "../../components/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { ActivatedRoute, Router } from '@angular/router';
import { PopPageComponent } from "../../components/pop-page/pop-page.component";
import { AddressDesc } from '@models/CustomerProfileData';
import { ProductInfo, ProductReviewData, ProductViewItemData } from '@models/ProductViewItemData';
import { SliderComponent } from "../../components/slider/slider.component";
import { ProductDataService } from '@services/Product/product-data.service';
import { LoaderComponent } from "../../components/loader/loader.component";
import { CustomerAuthenticationService } from '@services/Customer/customer-authentication.service';
import { CustomerDetailsApiData } from '@models/ApiModels/CustomerData';
import { CustomerCartSharedService } from '@services/Customer/customer-cart-shared.service';
import { CustomerOrder, DeliveryMethodModel, OrderDesc, OrderItem } from '@models/OrderData';
import { OrderService } from '@services/Product/order.service';
import { CustomerCartService } from '@services/Customer/customer-cart.service';

@Component({
    selector: 'app-product-view',
    standalone: true,
    templateUrl: './product-view.component.html',
    styleUrl: './product-view.component.css',
    imports: [NgFor, NgIf, DatePipe, FormsModule, FooterComponent, NavBarComponent, PopPageComponent, SliderComponent, LoaderComponent]
})
export class ProductViewComponent {
  info:any = [{Product_Info:false},{Product_Review:false},{Nutrition_Facts:false}];
  customerData:CustomerDetailsApiData | null = new CustomerDetailsApiData();
  address!:AddressDesc;
  productId: string = '';
  productViewItemData!:ProductViewItemData;
  CustomerOrderData: CustomerOrder = new CustomerOrder();
  ItemMaxCount!: number;
  largeImage!: string;
  popPage:boolean = false;
  loader:boolean = true;
  count:number = 1;

  constructor(private productDataService: ProductDataService, private orderService: OrderService, private customerCartService: CustomerCartService, private customerCartSharedService: CustomerCartSharedService, private customerAuthenticationService: CustomerAuthenticationService, private location: Location, private route: ActivatedRoute, private router: Router){
    this.GetProductFullData();
  }
  ngOnInit(): void {
    this.customerAuthenticationService.GetCustomerData().subscribe((data) => {
      this.customerData = data!;

      const primaryAddress = this.customerData?.AddressList.find((address) => address?.IsPrimary == true);
      this.address = primaryAddress!;
    });
  }
  generateRange(totalCount: number): number[] {
    return Array.from({ length: totalCount }, (_, i) => i + 1); // Creates an array [1, 2, ..., count]
  }

  GetProductFullData(){
    this.productId = this.route.snapshot.queryParamMap.get('ProductID')?? "";

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
        this.GetMaxValueData([result.productData.inventoryId]);
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
  GetMaxValueData(InventoryList:string[]){
    this.customerCartService.GetInventoryData(InventoryList).subscribe(
      result=>{
        this.BuildMaxValueData(result);
      },
      error=>{
        this.loader = false;
        if(error?.status == 401){
          this.customerAuthenticationService.ClearToken();
        }
        alert("Failed to load your Cart. Please try again.");
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
  BuildMaxValueData(maxCount: any){
    this.ItemMaxCount = maxCount[0].stockQuantity;
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
  BuildCustomerOrderData(){
    this.CustomerOrderData.OrderDate = new Date();
    this.CustomerOrderData.ShippingAddress = this.address.AddressID;
    
    var ItemData = new OrderItem();
    ItemData.ProductId = this.productId;
    ItemData.ProductTitle = this.productViewItemData.Title;
    ItemData.ProductDesc = this.productViewItemData.Desc;
    ItemData.Image = this.productViewItemData.Images[0];
    ItemData.Quantity = Number(this.count);
    ItemData.ItemMaxCount = Number(this.ItemMaxCount);
    ItemData.Price = this.productViewItemData.Price;
    ItemData.TotalPrice = this.count * this.productViewItemData.Price;
    ItemData.Units = this.productViewItemData.ProductInfo.NumberOfMangoes;
    ItemData.Weight = this.productViewItemData.ProductInfo.Weight;

    this.CustomerOrderData.OrderItems = [ItemData];
    this.CustomerOrderData.TotalAmount = ItemData.TotalPrice;
    
    this.orderService.SetCustomerOrderData(this.CustomerOrderData);
  }

  setDeliveryMethod(selectedValue: string) {
    this.CustomerOrderData.DeliveryMethod = new DeliveryMethodModel();
    this.CustomerOrderData.DeliveryMethod.Cost = 0;
    this.CustomerOrderData.DeliveryMethod.DeliveryMethod = selectedValue;
  }
  setDeliveryMethodToNull(){
    this.CustomerOrderData.DeliveryMethod = new DeliveryMethodModel();
  }

  ImageSelectedForLargeView(src: string){
    this.largeImage = src;
  }


  BuyNow(){
    if(this.productId && this.count>0){
      this.BuildCustomerOrderData();
      if(this.CustomerOrderData?.DeliveryMethod?.DeliveryMethod != null){
        this.router.navigate(["../checkout"]);
      }
      else{
        this.router.navigate(["../review"]);
      }
    }
    else{
      alert("Please select the QTY");
    }
  }
  AddToCart(IteamId: string){
    this.customerCartSharedService.AddProductToTheCart(IteamId);
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
    if(this.customerData?.AddressList != null){
      this.popPage = true;
    }
  }

  popPageData(data:any){
    this.address = data;
  }
  ClosePopPage(close:boolean){
    this.popPage = false;
  }




  RedirectTo(to:string){
    this.router.navigate(['/'+to]);
  }
  Search(word:string){
    this.router.navigate(['/collections'], { queryParams: { search: word } });
  }
}
