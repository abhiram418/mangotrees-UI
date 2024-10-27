import { NgClass, NgFor, NgForOf, NgIf } from '@angular/common';
import { Component,EventEmitter, Input, Output } from '@angular/core';
import { ProductViewItemData } from '../../../Models/ProductViewItemData';


@Component({
  selector: 'app-grid-view-item',
  standalone: true,
  imports: [NgForOf, NgClass, NgIf],
  templateUrl: './grid-view-item.component.html',
  styleUrl: './grid-view-item.component.css'
})
export class GridViewItemComponent {

  @Input() product: ProductViewItemData = new ProductViewItemData();  
  @Output() AddtoCart = new EventEmitter<any>();
  @Output() ViewProduct = new EventEmitter<string>();

  constructor(){
    this.product.Title = "Mangoes Banginapalli ";
    this.product.Desc = "These are the Mangoes Banginapalli with very good taste and exelent quality These are the Mangoes Banginapalli with very good taste and quality";
  }

  AddtoCartClicked(IteamId:any, event: Event){
    event.stopPropagation();
    this.AddtoCart.emit(IteamId);
  }

  ViewProductClicked(IteamId:any){
    this.ViewProduct.emit(IteamId);
  }
}
