import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-dice',
  standalone: true,
  imports: [CommonModule,NgFor],
  templateUrl: './dice.component.html',
  styleUrl: './dice.component.css'
})
export class DiceComponent {
  DiceList:number[]=[1,1,1];
  roll:any = 'రోల్';

  changeDiceList(n:number){
    if(n==1){
      this.DiceList = [1];
      this.roll = 'రోల్';
    }
    else if(n==2){
      this.DiceList = [1,1];
      this.roll = 'రోల్';
    }
    else{
      this.DiceList = [1,1,1];
      this.roll = 'రోల్';
    }
  }

  random(){
    this.roll = 0;
    for (let index = 0; index < this.DiceList.length; index++) {
      this.DiceList[index] = Math.floor(Math.random() * 6)+1;
      this.roll = this.roll + this.DiceList[index];
    }
  }
}
