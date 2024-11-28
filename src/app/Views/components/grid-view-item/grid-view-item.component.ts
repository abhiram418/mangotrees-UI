import { NgClass, NgFor, NgForOf, NgIf } from '@angular/common';
import { Component,EventEmitter, Input, Output } from '@angular/core';
import { ProductApiData, ProductItemApiData } from '@models/ApiModels/ProductData';
import { ProductViewItemData } from '@models/ProductViewItemData';


@Component({
  selector: 'app-grid-view-item',
  standalone: true,
  imports: [NgForOf, NgIf],
  templateUrl: './grid-view-item.component.html',
  styleUrl: './grid-view-item.component.css'
})
export class GridViewItemComponent {

  @Input() product: ProductItemApiData = new ProductItemApiData();  
  @Output() AddtoCart = new EventEmitter<any>();
  @Output() ViewProduct = new EventEmitter<string>();

  constructor(){}

  AddtoCartClicked(IteamId:any, event: Event){
    event.stopPropagation();
    this.AddtoCart.emit(IteamId);
  }

  ViewProductClicked(IteamId:any){
    this.ViewProduct.emit(IteamId);
  }
}
