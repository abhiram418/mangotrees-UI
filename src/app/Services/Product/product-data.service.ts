import { Injectable } from '@angular/core';
import { ProductApiData } from '@models/ApiModels/ProductData';
import { ApiRequestsService } from '@services/api-requests.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  productApiDataList!: ProductApiData[];
  isProductApiDataListThere: boolean = false;

  constructor(private apiRequests: ApiRequestsService) { }

  GetAllTheData(){
    const endpoint = 'Product/All';
    return this.apiRequests.sendRequest(endpoint, 'GET');
  }

  GetProductData(productId: string){
    const endpoint = `/Product/Data?productInfoId=${encodeURIComponent(productId)}`;
    return this.apiRequests.sendRequest(endpoint, 'GET');
  }

  GetProductInfoData(productId: string){
    const endpoint = `/Product/ProductInfo?productId=${encodeURIComponent(productId)}`;
    return this.apiRequests.sendRequest(endpoint, 'GET');
  }

  GetProductInfoListData(productIds: string[]){
    const endpoint = '/Product/ProductInfoList';
    return this.apiRequests.sendRequest(endpoint, 'POST', productIds);
  }

  // #######################################################

  getProductApiData(productId: string){
    // var productData: ProductApiData = new ProductApiData();
    if(this.isProductApiDataListThere){
      const product = this.productApiDataList.find(item => item.ProductId === productId);
      return product || false;
    }
    else{
      return false;
    }
  }

  setProductApiData(productListData: ProductApiData[]){
    this.isProductApiDataListThere = true;
    this.productApiDataList = productListData;
  }

}
