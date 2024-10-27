import { Component } from '@angular/core';

@Component({
  selector: 'app-coming-soon-page',
  standalone: true,
  imports: [],
  templateUrl: './coming-soon-page.component.html',
  styleUrl: './coming-soon-page.component.css'
})
export class ComingSoonPageComponent {
  private playing: boolean = false;

  song(){
    if(!this.playing){
      this.playing = true;
      let ComingSoonAudio = new Audio("../../assets/Audio/Master_Coming.wav");
      ComingSoonAudio.play();
    }
  }
}
