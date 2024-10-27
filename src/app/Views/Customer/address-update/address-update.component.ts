import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressDesc } from '@models/CustomerProfileData';

@Component({
  selector: 'app-address-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './address-update.component.html',
  styleUrl: './address-update.component.css'
})
export class AddressUpdateComponent {
  @Input() addressData: AddressDesc = new AddressDesc();
  @Output() data = new EventEmitter<any>();

  addressForm!: FormGroup;

  ngOnInit(): void {
    this.addressForm = new FormGroup({
      AddressTitle: new FormControl(this.addressData.AddressTitle, [Validators.required, Validators.minLength(3)]),
      Address: new FormControl(this.addressData.Address, [Validators.required, Validators.minLength(8)]),
      City: new FormControl(this.addressData.City, [Validators.required, Validators.minLength(5)]),
      State: new FormControl(this.addressData.State, [Validators.required ,Validators.minLength(5)]),
      Pincode: new FormControl(this.addressData.Pincode, [Validators.required, Validators.pattern('^[0-9]{6}$'), Validators.minLength(6), Validators.maxLength(6)])
    });
  }


  saveData(){
    if(this.addressForm.valid){
      // Convert Pincode to a number
      let pincodeValue = this.addressForm.get('Pincode')?.value;
      let numericPincode = pincodeValue ? parseInt(pincodeValue, 10) : null;

      // Update the Pincode value in the form
      this.addressForm.patchValue({
        Pincode: numericPincode
      });
      //send the data back
      this.data.emit(this.addressForm.value);
    }
    else{
      alert("Please Validate the Fields");
    }
  }
}
