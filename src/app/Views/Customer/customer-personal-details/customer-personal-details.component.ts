import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { NavBarData } from '../../../Models/navBarData';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-personal-details',
  standalone: true,
  imports: [NgIf, RouterLink, ReactiveFormsModule, FooterComponent, NavBarComponent],
  templateUrl: './customer-personal-details.component.html',
  styleUrl: './customer-personal-details.component.css'
})
export class CustomerPersonalDetailsComponent {
  customerDetailsForm!: FormGroup;
  navBarData:NavBarData= new NavBarData();
  Editable:boolean = false;

  constructor(private router: Router){}
  ngOnInit(): void {
    this.customerDetailsForm = new FormGroup({
      Name: new FormControl('abhiram', [Validators.required, Validators.minLength(3)]),
      Gender: new FormControl('Male', [Validators.required]),
      Email: new FormControl('abhiram.ch418@gmail.com', [Validators.required, Validators.email]),
      Password: new FormControl('abhiram', [Validators.required, Validators.minLength(6)])
    });
    this.customerDetailsForm.disable();
  }


  editButtonClicked(){
    this.Editable = !this.Editable;
    this.customerDetailsForm.enable();
  }
  saveButtonClicked(){
    if(this.customerDetailsForm.valid){
      this.Editable = !this.Editable;
      this.customerDetailsForm.disable();
    }
    else{
      alert("Please Validate the Fields");
    }
  }

  RedirectTo(to:string){
    alert("to: "+to);
    this.router.navigate(['/'+to]);
  }
  Search(word:string){
    alert("search: "+ word);
  }
}
