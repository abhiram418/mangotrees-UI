import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { NavBarData } from '../../components/nav-bar/navBarData';
import { ProductViewItemData } from '../../Models/ProductViewItemData';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-check-out-page',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, FooterComponent, NavBarComponent],
  templateUrl: './check-out-page.component.html',
  styleUrl: './check-out-page.component.css'
})
export class CheckOutPageComponent {
  data = new ProductViewItemData();
  temp:number | undefined;

  constructor(){
    this.temp = this.options[0].id;

    // this.data.DealTitle=null;
    // this.data.Discount=null;
    // this.data.SalePrice=null; 
  }

  options = [
    { id: 0, value: "QTY", disabled: true },
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 }
  ];
}