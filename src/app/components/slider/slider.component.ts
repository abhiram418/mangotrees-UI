import { NgForOf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [ NgForOf, NgStyle],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {
  images: string[] = [
    'https://www.paperboatfoods.com/cdn/shop/files/2022_PB_BANNER_02FEB_02__1000x1000-min_5_11zon_1200x.jpg',
    'https://www.paperboatfoods.com/cdn/shop/files/Teacher_Review_PB_Webiste_Desktop_1800x.jpg',
    'https://tinypng.com/images/social/website.jpg',
    'https://www.akamai.com/site/im-demo/perceptual-standard.jpg',
    'https://industrialempathy.com/img/remote/ZiClJf-1920w.jpg'
  ];
  index:number=0;
  image:string=this.images[0];


  right(){
    if(this.index==this.images.length-1){
      this.image=this.images[0];
      this.index=0;
    }
    else{
      this.index++;
      this.image=this.images[this.index];
    }
  }

  left(){
    if(this.index==0){
      this.index=this.images.length-1;
      this.image=this.images[this.index];
    }
    else{
      this.index--;
      this.image=this.images[this.index];
    }
  }
}
