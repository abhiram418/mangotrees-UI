import { Injectable } from '@angular/core';
import { ProductViewItemData } from '../Models/ProductViewItemData';

@Injectable({
  providedIn: 'root'
})
export class HomePageDataService {

  PinchData:ProductViewItemData[]= [];

  constructor() {
    this.PinchData[0] = new ProductViewItemData();
    this.PinchData[1] = new ProductViewItemData();
    this.PinchData[2] = new ProductViewItemData();
    // this.PinchData[3] = new ProductViewItemData();
    // this.PinchData[4] = new ProductViewItemData();
    // this.PinchData[5] = new ProductViewItemData();
    // this.PinchData[6] = new ProductViewItemData();
    // this.PinchData[7] = new ProductViewItemData();
    // this.PinchData[8] = new ProductViewItemData();

    this.PinchData[0].DealTitle=null;
    this.PinchData[0].Discount=null;
    this.PinchData[0].SalePrice=null; 
    this.PinchData[0].OldPrice=null;
    this.PinchData[0].Availability = false;
    this.PinchData[0].Stars = 5;
    // this.PinchData[0].Price=null;
    
    this.GetTheData();
  }

  GetTheData(){
    // Http.Get all the data needed
  }

  GetNewPinchData(){
    return(this.PinchData);
  }


}
