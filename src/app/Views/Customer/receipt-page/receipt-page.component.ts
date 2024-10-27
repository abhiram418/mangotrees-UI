import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-receipt-page',
  standalone: true,
  imports: [],
  templateUrl: './receipt-page.component.html',
  styleUrl: './receipt-page.component.css'
})
export class ReceiptPageComponent {
  @ViewChild('myVideo') myVideo!: ElementRef<HTMLVideoElement>;


  disableRightClick(event: MouseEvent): void {
    event.preventDefault();
  }

}
