import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { NavBarData } from '../../components/nav-bar/navBarData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-personal-details',
  standalone: true,
  imports: [RouterLink, FooterComponent, NavBarComponent],
  templateUrl: './customer-personal-details.component.html',
  styleUrl: './customer-personal-details.component.css'
})
export class CustomerPersonalDetailsComponent {
  navBarData:NavBarData= new NavBarData();
  Editable:boolean = false;

  constructor(private router: Router){}



  editButtonClicked(){
    this.Editable = !this.Editable;
  }
  saveButtonClicked(){
    this.Editable = !this.Editable;
  }

  RedirectTo(to:string){
    alert("to: "+to);
    this.router.navigate(['/'+to]);
  }
  Search(word:string){
    alert("search: "+ word);
  }
}
