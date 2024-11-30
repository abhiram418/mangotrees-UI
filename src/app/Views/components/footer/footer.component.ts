import { Component } from '@angular/core';
import  { RouterLink } from '@angular/router'
import { LoaderComponent } from "../loader/loader.component";

@Component({
    selector: 'app-footer',
    standalone: true,
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css',
    imports: []
})
export class FooterComponent {

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
      
}
