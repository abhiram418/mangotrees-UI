import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddressDesc } from '../../Models/CustomerProfileData';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-address-select',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './address-select.component.html',
  styleUrl: './address-select.component.css'
})
export class AddressSelectComponent {
  @Input() addressesList: AddressDesc[] = [];
  @Output() data = new EventEmitter<any>();


  SelectedAddress(ind:any){
    this.data.emit(this.addressesList[ind]);
  }
}
