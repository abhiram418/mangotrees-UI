import { Component, NgModule } from '@angular/core';
import { ProductInfo, ProductReviewData, ProductViewItemData, RipenessLevel } from '../../Models/ProductViewItemData';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FooterComponent } from "../../components/footer/footer.component";
import { CustomerData } from '../../Models/CustomerData';
import { AddressDesc } from '../../Models/CustomerProfileData';
import { FormsModule } from '@angular/forms';
import { NavBarData } from '../../components/nav-bar/navBarData';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { Router } from '@angular/router';
import { PopPageComponent } from "../../components/pop-page/pop-page.component";

@Component({
    selector: 'app-product-view',
    standalone: true,
    templateUrl: './product-view.component.html',
    styleUrl: './product-view.component.css',
    imports: [NgFor, NgIf, DatePipe, FormsModule, FooterComponent, NavBarComponent, PopPageComponent]
})
export class ProductViewComponent {
  navBarData = new NavBarData();
  test = true;
  info:any = [{Product_Info:false},{Product_Review:false},{Nutrition_Facts:false}];

  productViewItemData:ProductViewItemData = new ProductViewItemData();
  popPage:boolean = false;
  customerData:CustomerData = new CustomerData();
  addressesList:AddressDesc[] =[];

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

  constructor(private router: Router){
    var tempAddress1 = new AddressDesc();
    tempAddress1.AddressTitle = "Abhiram";
    tempAddress1.Address = "House no :- 7/263/1 banginapalli thota";
    tempAddress1.City = "NUZVID";
    tempAddress1.State = "ANDHRA PRADESH";
    tempAddress1.isPrimary = true;
    this.addressesList.push(tempAddress1);
    var tempAddress2 = new AddressDesc();
    tempAddress2.AddressTitle = "Abhiram1";
    tempAddress2.Address = "House no :- 7/263/1 banginapalli thota";
    tempAddress2.City = "NUZVID";
    tempAddress2.State = "ANDHRA PRADESH";
    this.addressesList.push(tempAddress2);

    // this.customerData.AddressList = [];
    // this.customerData.AddressList.push(new AddressDesc());
    // this.customerData.FirstName = "abhi";
    // this.customerData.AddressList[0].City = "abhi";
    // this.customerData.AddressList[0].Pincode = 521201;

    this.temp = this.options[0].id;

    // this.data.Available = "Only one left";

    // this.data.DealTitle=null;
    // this.data.Discount=null;
    // this.data.SalePrice=null; 
    // this.data.OldPrice=null;
    // this.data.Availability = false;
    // this.data.Stars = 5;


    this.productViewItemData.ProductInfo = new ProductInfo();
    this.productViewItemData.ProductInfo.NumberOfMangoes = 100;
    this.productViewItemData.ProductInfo.RipenessLevel = RipenessLevel.Ripe;
    this.productViewItemData.ProductInfo.StorageInstructions = "Nothing for now, store anywhere";
    this.productViewItemData.ProductInfo.Variety = "Abhiram's Variety";
    this.productViewItemData.ProductInfo.Weight = 100;
    // this.productViewItemData.NutritionFacts = ['Nothing for now, store anywhere Nothing for now, store anywhere Nothing for now, store anywhere'];
    // this.productViewItemData.NutritionFacts = ['Nothingfornow,storeanywhereNothingfornow,storeanywhereNothingfornow,storeanywhereNothingfornow,storeanywhere'];
    this.productViewItemData.NutritionFacts = ['Nothing for now, store anywhereNothing for now, store anywhere Nothing for now, store anywhere','Nothing for now, store anywhere Nothing for now, store anywhere Nothing for now, store anywhere','Nothing for now, store anywhere Nothing for now, store anywhere Nothing for now, store anywhere'];
    // this.productViewItemData.NutritionFacts = ['Nothingfornow,storeanywhereNothingfornow,storeanywhereNothingfornow,storeanywhere','Nothingfornow,storeanywhereNothingfornow,storeanywhereNothingfornow,storeanywhere','Nothingfornow,storeanywhereNothingfornow,storeanywhereNothingfornow,storeanywhere'];

    this.productViewItemData.ProductReviewData = [new ProductReviewData()];
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
    if(data){
      alert("Address is selected.");
    }
    else{
      alert("Address is not selected, please try again.");
    }
  }
  ClosePopPage(close:boolean){
    this.popPage = false;
  }




  RedirectTo(to:string){
    alert("to: "+to);
    this.router.navigate(['/'+to]);
  }
  Search(word:string){
    this.productViewItemData.DealTitle=null;
    this.productViewItemData.Discount=null;
    this.productViewItemData.SalePrice=null; 
    alert("search: "+ word);
  }
}
