import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './otp-page.component.html',
  styleUrl: './otp-page.component.css'
})
export class OTPPageComponent {
  @Output() data = new EventEmitter<any>();
  OTPForm!: FormGroup;

  ngOnInit(): void {
    this.OTPForm = new FormGroup({
      OTP: new FormControl('', [Validators.required,  Validators.pattern('^[0-9]{4}$'), Validators.minLength(4)])
    });
  }

  saveData(){
    if(this.OTPForm.valid){
      this.data.emit(this.OTPForm.value.OTP);
    }
    else{
      alert("The entered OTP is not valid");
    }
  }

}
