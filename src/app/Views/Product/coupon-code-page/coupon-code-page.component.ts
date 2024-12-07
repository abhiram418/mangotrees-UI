import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-coupon-code-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './coupon-code-page.component.html',
  styleUrl: './coupon-code-page.component.css'
})
export class CouponCodePageComponent {
  @Output() data = new EventEmitter<any>();
  couponCode: string = '';


  saveData(){
    if(this.couponCode){
      this.data.emit(this.couponCode);
    }
  }
}
