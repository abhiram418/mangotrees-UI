import { NgForOf, NgIf, NgStyle } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [NgIf, NgForOf, NgStyle],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {
  @ViewChild('slider') scrollableDiv!: ElementRef;
  images: string[] = [
    'https://www.paperboatfoods.com/cdn/shop/files/2022_PB_BANNER_02FEB_02__1000x1000-min_5_11zon_1200x.jpg',
    'https://www.paperboatfoods.com/cdn/shop/files/Teacher_Review_PB_Webiste_Desktop_1800x.jpg',
    'https://tinypng.com/images/social/website.jpg',
    'https://www.akamai.com/site/im-demo/perceptual-standard.jpg',
    'https://industrialempathy.com/img/remote/ZiClJf-1920w.jpg'
  ];


  right() {
    var scrollWidth = this.scrollableDiv.nativeElement.scrollWidth;
    var clientWidth = this.scrollableDiv.nativeElement.clientWidth;
    var scrollLeft = this.scrollableDiv.nativeElement.scrollLeft;
    console.log(scrollWidth)
    console.log(clientWidth + scrollLeft);
    if (scrollLeft + clientWidth + 10 >= scrollWidth) {
      
      // If reached the end, go back to the start
      this.scrollableDiv.nativeElement.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      // Scroll right by the width of the screen
      this.scrollableDiv.nativeElement.scrollBy({ left: clientWidth, behavior: 'smooth' });
    }
  }
  
  left() {
    var clientWidth = this.scrollableDiv.nativeElement.clientWidth;
    var scrollLeft = this.scrollableDiv.nativeElement.scrollLeft;
    
    if (scrollLeft === 0) {
      // If at the beginning, go to the end
      this.scrollableDiv.nativeElement.scrollTo({ left: this.scrollableDiv.nativeElement.scrollWidth, behavior: 'smooth' });
    } else {
      // Scroll left by the width of the screen
      this.scrollableDiv.nativeElement.scrollBy({ left: -clientWidth, behavior: 'smooth' });
    }
  }
}
