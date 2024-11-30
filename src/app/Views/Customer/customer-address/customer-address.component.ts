import { Component } from '@angular/core';
import { NavBarData } from '@models/navBarData';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { PopPageComponent } from "../../components/pop-page/pop-page.component";
import { Location, NgFor, NgIf } from '@angular/common';
import { LoaderComponent } from "../../components/loader/loader.component";
import { AddressDesc } from '@models/CustomerProfileData';
import { CustomerAddressService } from '@services/Customer/customer-address.service';
import { CustomerAuthenticationService } from '@services/Customer/customer-authentication.service';

@Component({
  selector: 'app-customer-address',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, FooterComponent, NavBarComponent, PopPageComponent, LoaderComponent],
  templateUrl: './customer-address.component.html',
  styleUrl: './customer-address.component.css'
})
export class CustomerAddressComponent {
  popPage:boolean = false;
  loader:boolean = true;
  editButtonClickedBy:number = 0;
  addressData:AddressDesc = new AddressDesc();;
  addressesList:AddressDesc[] = [];

  constructor(private customerAddressService: CustomerAddressService, private customerAuthenticationService: CustomerAuthenticationService, private location: Location, private router: Router){
    this.GetAllTheCustomerAddresses();
  }

  GetAllTheCustomerAddresses(){
    
    this.customerAddressService.GetCustomerAddresses().subscribe(
      result =>{
        this.BuildCustomerAddressesListData(result);
        this.loader = false;
      },
      error =>{
        this.loader = false;
        if(error?.status == 401){
          this.customerAuthenticationService.ClearToken();
        }
        alert("Failed to Get Addresses. Please try again.");
        if (window.history.length > 1) {
          this.location.back()
        } else {
          this.router.navigate(["profile"]);
        }
      }
    )
  }
  AddCustomerAddress(CustomerAddress: AddressDesc){
    this.customerAddressService.PostCustomerAddress(CustomerAddress).subscribe(
      result =>{
        var address = CustomerAddress;
        address.AddressID = result.addressId;
        this.addressesList.push(address);
        this.loader = false;
      },
      error =>{
        this.loader = false;
        if(error?.status == 401){
          this.customerAuthenticationService.ClearToken();
        }
        alert("Failed to Post your Address. Please try again.");
      }
    );
  }
  UpdateCustomerAddress(CustomerAddress: AddressDesc, index: number){
    this.customerAddressService.UpdateCustomerAddress(CustomerAddress).subscribe(
      result =>{
        if(result.message == "Success"){
          this.addressesList[index] = CustomerAddress;
        }
        this.loader = false;
      },
      error =>{
        this.loader = false;
        if(error?.status == 401){
          this.customerAuthenticationService.ClearToken();
        }
        alert("Failed to Update your Address. Please try again.");
      }
    );
  }
  DeteleCustomerAddress(CustomerAddress: AddressDesc, index: number){
    this.customerAddressService.DeteleCustomerAddress(CustomerAddress.AddressID!).subscribe(
      result =>{
        if(result.message == "Success"){
          this.addressesList.splice(index, 1);
        }
        if(this.addressesList.length == 1 || CustomerAddress.IsPrimary){
          this.addressesList[0].IsPrimary = true;
          this.UpdateCustomerAddress(this.addressesList[0], 0);
        }
        else{
          this.loader = false;
        }
      },
      error =>{
        this.loader = false;
        if(error?.status == 401){
          this.customerAuthenticationService.ClearToken();
        }
        alert("Failed to Delete your Address. Please try again.");
      }
    );
  }

  BuildCustomerAddressData(AddressData: any): AddressDesc{
    var Address = new AddressDesc();
    Address.AddressID = AddressData.AddressID;
    Address.AddressTitle = AddressData.AddressTitle;
    Address.Address = AddressData.Address;
    Address.City = AddressData.City;
    Address.State = AddressData.State;
    Address.Pincode = AddressData.Pincode;
    Address.IsDeleteable = AddressData.IsDeleteable;
    Address.IsEditable = AddressData.IsEditable;
    Address.IsPrimary = AddressData.IsPrimary;
    return Address
  }
  BuildCustomerAddressesListData(AddressData: any){
    for (let index = 0; index < AddressData.length; index++) {
      var Address = new AddressDesc();
      Address.AddressID = AddressData[index].addressId;
      Address.AddressTitle = AddressData[index].addressTitle;
      Address.Address = AddressData[index].address;
      Address.City = AddressData[index].city;
      Address.State = AddressData[index].state;
      Address.Pincode = AddressData[index].pincode;
      Address.IsDeleteable = AddressData[index].isDeleteable;
      Address.IsEditable = AddressData[index].isEditable;
      Address.IsPrimary = AddressData[index].isPrimary;

      this.addressesList[index] = Address;
    }
  }

  addAddressClicked(){
    this.popPage = true;
    this.editButtonClickedBy = -1;
  }
  editButtonClicked(index:number){
    this.popPage = true;
    this.addressData = this.addressesList[index];
    this.editButtonClickedBy = index;
  }
  deleteButtonClicked(index:number){
    if(this.addressesList.length == 1){
      alert("You must have at least one address saved. Please add a new address before deleting the current one");
      return;
    }
    this.loader = true;
    this.DeteleCustomerAddress(this.addressesList[index], index);
  }
  setPrimaryButtonClicked(index:number){
    this.loader = true;

    this.addressesList.forEach((address, i) => {
      if(address.IsPrimary && i!=index){
        address.IsPrimary = false;
        this.loader = true;
        this.UpdateCustomerAddress(address, i);
      }
    });
    this.loader = true;
    this.addressesList[index].IsPrimary = true;
    this.UpdateCustomerAddress(this.addressesList[index], index);
  }

  RedirectTo(to:string){
    this.router.navigate(['../'+to]);
  }
  Search(word:string){
    alert("search: "+ word);
  }

  popPageData(data:any){
    this.loader = true;

    if(this.editButtonClickedBy == -1){
      data.IsPrimary = false;
      data.IsEditable = true;
      data.IsDeleteable = true;
      this.AddCustomerAddress(data);
    }
    else{
      data.AddressID = this.addressesList[this.editButtonClickedBy].AddressID;
      data.IsPrimary = this.addressesList[this.editButtonClickedBy].IsPrimary;
      data.IsEditable = this.addressesList[this.editButtonClickedBy].IsEditable;
      data.IsDeleteable = this.addressesList[this.editButtonClickedBy].IsDeleteable;
      var address = this.BuildCustomerAddressData(data);
      this.UpdateCustomerAddress(address, this.editButtonClickedBy);
    }
  }
  ClosePopPage(close:boolean){
    this.popPage = false;
    this.loader = false;
  }
}
