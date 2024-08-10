import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})
export class PopUpComponent {
  @Input() text: string = "";  
  @Output() close = new EventEmitter<any>();

  closePopUp(){
    this.close.emit(false);
  }
}
