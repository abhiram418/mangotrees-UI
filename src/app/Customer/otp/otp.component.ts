import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router} from '@angular/router';
import { LoaderComponent } from "../../components/loader/loader.component";

@Component({
    selector: 'app-otp',
    standalone: true,
    templateUrl: './otp.component.html',
    styleUrl: './otp.component.css',
    imports: [ReactiveFormsModule, RouterLink, LoaderComponent]
})
export class OTPComponent{

}
