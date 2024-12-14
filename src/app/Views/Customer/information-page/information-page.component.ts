import { Component } from '@angular/core';
import { Location, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { InformationData, InformationPageData } from '@models/InformationPageData';
import { GeneralService } from '@services/General/general.service';
import { LoaderComponent } from "../../components/loader/loader.component";

@Component({
  selector: 'app-information-page',
  standalone: true,
  imports: [NgFor, NgIf, NavBarComponent, FooterComponent, LoaderComponent],
  templateUrl: './information-page.component.html',
  styleUrl: './information-page.component.css'
})
export class InformationPageComponent {
  DataList:InformationPageData = new InformationPageData();
  page:string = '';
  loader: boolean = true;

  constructor(private generalService:GeneralService, private pageInfo: ActivatedRoute, private location: Location,private router: Router){ }

  ngOnInit() {
    this.pageInfo.queryParams.subscribe(params => {
      this.page = params['page'] || null;
      if(this.page != null){
        this.GetInformationData();
      }
    });
  }

  GetInformationData(){
    this.generalService.GetInformation(this.page).subscribe(
      result=>{
        this.loader = false;
        this.BuildInformationData(result);
      },
      error=>{
        this.loader = false;
        if (window.history.length > 1) {
          this.location.back()
        } else {
          this.router.navigate(["home"]);
        }
      }
    )
  }

  BuildInformationData(informationData: any){
    this.DataList.InformationTitle = informationData.informationTitle;

    for (let index = 0; index < informationData.details.length; index++) {
      var data = new InformationData();
      data.Title = informationData.details[index].title;
      data.Description = informationData.details[index].description;
      this.DataList.Details[index] = data;
    }
  }

  RedirectTo(to:string){
    this.router.navigate(['/'+to]);
  }
  Search(word:string){
    this.router.navigate(['/collections'], { queryParams: { search: word } });
  }
}
