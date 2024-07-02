import { Injectable } from '@angular/core';
import { gridViewItemData } from '../components/grid-view-item/gridViewItemData';

@Injectable({
  providedIn: 'root'
})
export class HomePageDataService {

  PinchData:gridViewItemData[]= [];

  constructor() {
    this.PinchData[0] = new gridViewItemData();
    this.PinchData[1] = new gridViewItemData();
    this.PinchData[2] = new gridViewItemData();
    // this.PinchData[3] = new gridViewItemData();
    // this.PinchData[4] = new gridViewItemData();
    // this.PinchData[5] = new gridViewItemData();
    // this.PinchData[6] = new gridViewItemData();
    // this.PinchData[7] = new gridViewItemData();
    // this.PinchData[8] = new gridViewItemData();

    this.PinchData[0].DealTitle=null;
    this.PinchData[0].Discount=null;
    this.PinchData[0].SalePrice=null; 
    this.PinchData[0].OldPrice=null;
    this.PinchData[0].Availability = true;
    // this.PinchData[0].Price=null;
  }

  GetNewPinchData(){
    return(this.PinchData);
  }


}
