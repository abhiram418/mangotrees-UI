import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { NavBarData } from '@models/navBarData';
import { InformationData, InformationPageData } from '@models/InformationPageData';

@Component({
  selector: 'app-information-page',
  standalone: true,
  imports: [NgFor, NavBarComponent, FooterComponent],
  templateUrl: './information-page.component.html',
  styleUrl: './information-page.component.css'
})
export class InformationPageComponent {
  DateList:InformationPageData = new InformationPageData();
  page:string = '';

  constructor(private pageInfo: ActivatedRoute,private router: Router){
    this.DateList.Information.push(new InformationData());
    // this.DateList.Information.push(new InformationData());
  }

  ngOnInit() {
    this.pageInfo.queryParams.subscribe(params => {
      this.page = params['page'] || null;
    });
  }

  RedirectTo(to:string){
    this.router.navigate(['/'+to]);
  }
  Search(word:string){
    this.router.navigate(['/collections'], { queryParams: { search: word } });
  }
}
