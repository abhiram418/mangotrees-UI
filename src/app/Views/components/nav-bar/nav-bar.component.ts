import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavBarData } from '@models/navBarData';
import { CustomerAuthenticationService } from '@services/Customer/customer-authentication.service';
import { NavBarService } from '@services/General/nav-bar.service';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  searchForm!: FormGroup;
  navBarData: NavBarData | null = null;
  @Output() redirectTo = new EventEmitter<any>();
  @Output() search = new EventEmitter<string>();

  constructor(private navBarService:NavBarService, private customerAuthenticationService: CustomerAuthenticationService){
    this.searchForm = new FormGroup({
      searchWord: new FormControl("")
    });
  }

  ngOnInit(): void {
    this.navBarService.GetNavBarData().subscribe((data) => {
      this.navBarData = data;
    });
  }


  RedirectTo(to:string){
    this.redirectTo.emit(to);
  }

  Search(){
    if(this.searchForm.valid){
      this.search.emit(this.searchForm.value.searchWord.trim());
    }
  }
  
}
