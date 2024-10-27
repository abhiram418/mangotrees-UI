import { Component } from '@angular/core';
import { NavBarData } from '@models/navBarData';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { PopPageComponent } from "../../components/pop-page/pop-page.component";
import { NgFor, NgIf } from '@angular/common';
import { LoaderComponent } from "../../components/loader/loader.component";
import { AddressDesc } from '@models/CustomerProfileData';

@Component({
  selector: 'app-customer-address',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, FooterComponent, NavBarComponent, PopPageComponent, LoaderComponent],
  templateUrl: './customer-address.component.html',
  styleUrl: './customer-address.component.css'
})
export class CustomerAddressComponent {
  navBarData:NavBarData = new NavBarData();
  Editable:boolean = false;
  popPage:boolean = false;
  loader:boolean = false;
  editButtonClickedBy:number = 0;
  addressData!:AddressDesc;
  addressesList:AddressDesc[] = [];

  constructor(private router: Router){
    var tempAddress1 = new AddressDesc();
    tempAddress1.AddressTitle = "Abhiram";
    tempAddress1.Address = "House no :- 7/263/1 banginapalli thota";
    tempAddress1.City = "NUZVID";
    tempAddress1.State = "ANDHRA PRADESH";
    this.addressesList.push(tempAddress1);
    var tempAddress2 = new AddressDesc();
    tempAddress2.AddressTitle = "Abhiram";
    tempAddress2.Address = "House no :- 7/263/1 banginapalli thota";
    tempAddress2.City = "NUZVID";
    tempAddress2.State = "ANDHRA PRADESH";
    this.addressesList.push(tempAddress2);
  }


  addAddressClicked(){
    this.popPage = true;
    this.editButtonClickedBy = -1;
    
    this.addressData = new AddressDesc();
    this.addressData.AddressTitle = '';
    this.addressData.City = '';
  }
  editButtonClicked(index:number){
    this.popPage = true;
    this.addressData = this.addressesList[index];
    this.editButtonClickedBy = index;
  }
  deleteButtonClicked(index:number){
    if(this.addressesList[index].isPrimary && this.addressesList.length>1){
      this.addressesList.splice(index, 1);
      this.addressesList[0].isPrimary = true;
    }
    else{
      this.addressesList.splice(index, 1);
    }
  }
  setPrimaryButtonClicked(index:number){
    this.addressesList.forEach((address, i) => {
      address.isPrimary = i === index;
    });
  }

  RedirectTo(to:string){
    alert("to: "+to);
    this.router.navigate(['../'+to]);
  }
  Search(word:string){
    alert("search: "+ word);
  }

  popPageData(data:any){
    if(this.editButtonClickedBy == -1){
      var add = new AddressDesc();
      add = data;
      add.isPrimary = false;
      add.IsEditable = true;
      add.IsDeleteable = true;
      this.addressesList.push(add);
    }
    else{
      this.addressesList[this.editButtonClickedBy].AddressTitle = data.AddressTitle;
      this.addressesList[this.editButtonClickedBy].Address = data.Address;
      this.addressesList[this.editButtonClickedBy].City = data.City;
      this.addressesList[this.editButtonClickedBy].State = data.State;
      this.addressesList[this.editButtonClickedBy].Pincode = data.Pincode;
      console.log(this.addressesList[this.editButtonClickedBy]);
    }
  }
  ClosePopPage(close:boolean){
    this.popPage = false;
    this.loader = false;
  }
}
