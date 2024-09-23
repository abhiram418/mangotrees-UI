import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router} from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
    selector: 'app-login-page',
    standalone: true,
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.css',
    imports: [NgIf, RouterLink, LoaderComponent, ReactiveFormsModule]
})
export class LoginPageComponent {
  
  
}
