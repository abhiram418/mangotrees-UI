import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-otp-page',
  standalone: true,
  imports: [],
  templateUrl: './otp-page.component.html',
  styleUrl: './otp-page.component.css'
})
export class OTPPageComponent {
  @Output() data = new EventEmitter<any>();


  saveData(){
    if(true){
      this.data.emit("otp");
    }
  }

}
