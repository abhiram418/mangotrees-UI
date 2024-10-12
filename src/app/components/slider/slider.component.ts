import { NgForOf, NgIf, NgStyle } from '@angular/common';
import { Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [NgIf, NgForOf, NgStyle],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {
  @ViewChild('slider') scrollableDiv!: ElementRef;
  scrolling: boolean = false;
  images: string[] = [
    'https://www.paperboatfoods.com/cdn/shop/files/2022_PB_BANNER_02FEB_02__1000x1000-min_5_11zon_1200x.jpg',
    'https://www.paperboatfoods.com/cdn/shop/files/Teacher_Review_PB_Webiste_Desktop_1800x.jpg',
    'https://tinypng.com/images/social/website.jpg',
    'https://www.akamai.com/site/im-demo/perceptual-standard.jpg',
    'https://industrialempathy.com/img/remote/ZiClJf-1920w.jpg'
  ];

  ngOnInit() {
    // Check if 'window' is available before accessing it
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.onResize.bind(this));
    }
  }

  ngOnDestroy() {
    // Remove the event listener when the component is destroyed
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize.bind(this));
    }
  }

  onResize() {
    const clientWidth = this.scrollableDiv.nativeElement.clientWidth;
    const scrollLeft = this.scrollableDiv.nativeElement.scrollLeft;

    // Calculate which image is currently being viewed
    const currentImageIndex = Math.round(scrollLeft / clientWidth);

    // Scroll back to the closest image after resizing
    this.scrollableDiv.nativeElement.scrollTo({
      left: currentImageIndex * clientWidth,
      behavior: 'auto'
    });
  }
  


  right() {
    if (this.scrolling) return;  
    this.scrolling = true;

    var scrollWidth = this.scrollableDiv.nativeElement.scrollWidth;
    var clientWidth = this.scrollableDiv.nativeElement.clientWidth;
    var scrollLeft = this.scrollableDiv.nativeElement.scrollLeft;

    console.log(scrollWidth)
    console.log(clientWidth + scrollLeft);
    if (scrollLeft + clientWidth + 10 >= scrollWidth) {
      this.scrollableDiv.nativeElement.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      this.scrollableDiv.nativeElement.scrollBy({ left: clientWidth, behavior: 'smooth' });
    }

    setTimeout(() => {
      this.scrolling = false;  
    }, 1000);
  }
  
  left() {
    if (this.scrolling) return; 
    this.scrolling = true;

    var clientWidth = this.scrollableDiv.nativeElement.clientWidth;
    var scrollLeft = this.scrollableDiv.nativeElement.scrollLeft;
    
    if (scrollLeft === 0) {
      this.scrollableDiv.nativeElement.scrollTo({ left: this.scrollableDiv.nativeElement.scrollWidth, behavior: 'smooth' });
    } else {
      this.scrollableDiv.nativeElement.scrollBy({ left: -clientWidth, behavior: 'smooth' });
    }

    setTimeout(() => {
      this.scrolling = false;  
    }, 1000);
  }
}
