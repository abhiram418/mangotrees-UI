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
  DiceList:number[]=[1];
  Roll:any = 'రోల్';
  RotateDice:boolean = false;

  changeDiceList(n:number){
    if(n==1){
      this.DiceList = [1];
      this.Roll = 'రోల్';
    }
    else if(n==2){
      this.DiceList = [1,1];
      this.Roll = 'రోల్';
    }
    else{
      this.DiceList = [1,1,1];
      this.Roll = 'రోల్';
    }
  }

  random(){
    this.Roll = 0;
    this.RotateDice = true;
    for (let index = 0; index < this.DiceList.length; index++) {
      this.DiceList[index] = Math.floor(Math.random() * 6)+1;
      this.Roll = this.Roll + this.DiceList[index];
    }
  }

  getDiceClass() {
    let RotateDiceTemp = this.RotateDice;
    this.RotateDice = false;
    return RotateDiceTemp ? 'rotate' : '';
  }
}
