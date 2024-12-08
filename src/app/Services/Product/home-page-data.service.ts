import { Injectable } from '@angular/core';
import { ProductViewItemData } from '@models/ProductViewItemData';

@Injectable({
  providedIn: 'root'
})
export class HomePageDataService {

  PinchData:ProductViewItemData[]= [];

  constructor() {}

  GetTheData(){
    // Http.Get all the data needed
  }

  GetNewPinchData(){
    return(this.PinchData);
  }


}
