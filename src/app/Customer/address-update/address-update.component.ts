import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-address-update',
  standalone: true,
  imports: [],
  templateUrl: './address-update.component.html',
  styleUrl: './address-update.component.css'
})
export class AddressUpdateComponent {
  @Output() data = new EventEmitter<any>();

  saveData(){
    this.data.emit({"address changed": true});
  }
}
