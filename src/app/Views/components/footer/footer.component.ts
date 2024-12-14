import { Component } from '@angular/core';
import  { Router, RouterLink } from '@angular/router'
import { LoaderComponent } from "../loader/loader.component";

@Component({
    selector: 'app-footer',
    standalone: true,
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css',
    imports: []
})
export class FooterComponent {

    constructor(private router: Router){}

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    RedirectTo(word:string){
        this.scrollToTop();
        this.router.navigate(['/information'], { queryParams: { page: word } });
    }
      
}
