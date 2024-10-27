import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-coupon-code-page',
  standalone: true,
  imports: [],
  templateUrl: './coupon-code-page.component.html',
  styleUrl: './coupon-code-page.component.css'
})
export class CouponCodePageComponent {
  @Output() data = new EventEmitter<any>();
  


  saveData(){
    if(true){
      this.data.emit(true);
    }
  }
}
