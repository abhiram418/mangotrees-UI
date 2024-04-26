import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgIf],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  // loader:boolean = true;

  // async loaderCaller(){
  //   this.loader = true;
  //   setTimeout(()=>{
  //     this.loader = false;
  //   },5000);
  // }

}
