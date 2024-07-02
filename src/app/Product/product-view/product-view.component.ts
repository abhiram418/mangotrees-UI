import { Component, NgModule } from '@angular/core';
import { ProductViewItemData } from '../../Models/ProductViewItemData';
import { NgFor, NgIf } from '@angular/common';
import { FooterComponent } from "../../components/footer/footer.component";
import { CustomerData } from '../../Models/CustomerData';
import { AddressDesc } from '../../Models/CustomerProfileData';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-product-view',
    standalone: true,
    templateUrl: './product-view.component.html',
    styleUrl: './product-view.component.css',
    imports: [NgFor, NgIf, FormsModule, FooterComponent]
})
export class ProductViewComponent {
  data:ProductViewItemData= new ProductViewItemData();
  customerData:CustomerData = new CustomerData();
  selectedOption: number;

  options = [
    { id: 0, value: "Quantity", disabled: true },
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 }
  ];

  constructor(){
    // this.customerData.AddressList = [];
    // this.customerData.AddressList.push(new AddressDesc());
    // this.customerData.FirstName = "abhi";
    // this.customerData.AddressList[0].City = "abhi";
    // this.customerData.AddressList[0].Pincode = 521201;

    this.selectedOption = this.options[0].id;

    // this.data.DealTitle=null;
    // this.data.Discount=null;
    // this.data.SalePrice=null; 
    // this.data.OldPrice=null;
    // this.data.Availability = false;
    // this.data.Stars = 5;
  }
}
