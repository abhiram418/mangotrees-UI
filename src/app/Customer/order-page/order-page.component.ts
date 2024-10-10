import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { OrderDesc, OrderItem, OrderStatus } from '../../Models/OrderData';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { NavBarData } from '../../components/nav-bar/navBarData';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, NavBarComponent, FooterComponent],
  providers: [DatePipe],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css'
})
export class OrderPageComponent {
  navBarData:NavBarData = new NavBarData();
  @ViewChild('orderScroll') scrollableDiv!: ElementRef;
  currentDate: string;
  status:OrderStatus = OrderStatus.Paid;
  ordersList:OrderDesc[] = [new OrderDesc('324353443'),new OrderDesc('324353443')];

  constructor(private router: Router, private datePipe: DatePipe) {
    this.currentDate = this.datePipe.transform(new Date(), 'MMM d, yyyy') || '';

    this.ordersList[0].OrderItems.push(new OrderItem("324353443"),new OrderItem("324353443"),new OrderItem("324353443"),new OrderItem("324353443"));
    this.ordersList[1].OrderItems.push(new OrderItem("324353443"));
  }

  ViewProduct(IteamId:string){
    alert("View: "+IteamId);
    this.router.navigate(['/product/'+IteamId]);
  }

  RedirectTo(to:string){
    alert("to: "+to);
    this.router.navigate(['../'+to]);
  }
  Search(word:string){
    alert("search: "+ word);
  }

  scrollDiv() {
    this.scrollableDiv.nativeElement.scrollBy({ left: 380, behavior: 'smooth' }); // Scrolls right by 50px
  }

}
