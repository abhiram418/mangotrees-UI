import { Component } from '@angular/core';
import { FooterComponent } from "../components/footer/footer.component";
import { NavBarComponent } from "../components/nav-bar/nav-bar.component";

@Component({
    selector: 'app-test',
    standalone: true,
    templateUrl: './test.component.html',
    styleUrl: './test.component.css',
    imports: [FooterComponent, NavBarComponent]
})
export class TestComponent {

}
