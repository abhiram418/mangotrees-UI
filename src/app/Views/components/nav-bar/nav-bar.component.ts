import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavBarData } from '../../../Models/navBarData';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  @Input() navBarData: NavBarData = new NavBarData();
  @Output() redirectTo = new EventEmitter<any>();
  @Output() search = new EventEmitter<any>();



  RedirectTo(to:string){
    this.redirectTo.emit(to);
  }

  Search(){
    this.search.emit('search');
  }
  
}
