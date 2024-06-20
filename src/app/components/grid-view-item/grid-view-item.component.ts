import { NgClass, NgFor, NgForOf } from '@angular/common';
import { Component,EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-grid-view-item',
  standalone: true,
  imports: [NgForOf, NgClass],
  templateUrl: './grid-view-item.component.html',
  styleUrl: './grid-view-item.component.css'
})
export class GridViewItemComponent {

  
  title:string='Title Title Title TitleTitleTitleTitle Titlend ';
  desc:string='dmasjndflsnflksdmdmasjndflsnflksdmdmasjndflsnflksdm';
  deal_title:string='Limited time deal';
  discount:number=-10;
  old_price:number=1000;
  sale_price:number=999;

  items: string[] = ['Item 1', 'Item 2', 'Item 3'];



  @Output() AddtoCart = new EventEmitter<any>();

  AddtoCartClicked(IteamId:string){
    this.AddtoCart.emit(IteamId);
  }
}
