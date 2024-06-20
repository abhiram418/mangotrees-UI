import { NgClass, NgFor, NgForOf, NgIf } from '@angular/common';
import { Component,EventEmitter, Input, Output } from '@angular/core';
import { gridViewItemData } from './gridViewItemData';


@Component({
  selector: 'app-grid-view-item',
  standalone: true,
  imports: [NgForOf, NgClass, NgIf],
  templateUrl: './grid-view-item.component.html',
  styleUrl: './grid-view-item.component.css'
})
export class GridViewItemComponent {

  @Input() product: gridViewItemData = new gridViewItemData();  
  @Output() AddtoCart = new EventEmitter<any>();
  @Output() ViewProduct = new EventEmitter<string>();


  AddtoCartClicked(IteamId:string, event: Event){
    event.stopPropagation();
    this.AddtoCart.emit(IteamId);
  }

  ViewProductClicked(IteamId:string){
    this.ViewProduct.emit(IteamId);
  }
}
