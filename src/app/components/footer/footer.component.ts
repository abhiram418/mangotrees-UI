import { Component } from '@angular/core';
import  { RouterLink } from '@angular/router'
import { LoaderComponent } from "../loader/loader.component";
import { DiceComponent } from "../../dice/dice.component";

@Component({
    selector: 'app-footer',
    standalone: true,
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css',
    imports: [RouterLink, LoaderComponent, DiceComponent]
})
export class FooterComponent {
}
