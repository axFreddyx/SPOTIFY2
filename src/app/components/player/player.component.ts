import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {

  constructor(
    private api: ApiService,
    private storage: Storage
  ) { }

  song:any[] = [];

  public progress = 0;
  public audio: HTMLAudioElement | null = null;
  public isPlaying = false;

  ngOnInit() {}


  getSong(){}

  
  togglePlay() {
    const play = document.querySelector("#play");
    const pause = document.querySelector("#pause");
    if (!this.audio) {
      this.audio = document.querySelector("#audio");
    }

    if (this.audio) {
      if (this.audio.paused) {
        this.audio.play();
        play?.classList.toggle("oculto");
        pause?.classList.toggle("oculto");
      } else {
        this.audio.pause();
        play?.classList.toggle("oculto");
        pause?.classList.toggle("oculto");
      }
      this.isPlaying = !this.audio.paused;

      // Iniciar la actualización del progreso cuando el audio se esté reproduciendo
      if (this.isPlaying) {
        this.updateProgress();
      }
    }
  }

  updateProgress() {
    // Actualizar el progreso mientras el audio se esté reproduciendo
    if (this.audio && !this.audio.paused) {
      const time = document.querySelector("#time");
      this.progress = this.audio.currentTime / this.audio.duration;
      if (time) { // Verificar si time no es nulo
          // Convertir segundos a minutos y segundos
          const minutes = Math.floor(this.audio.currentTime / 60);
          const seconds = Math.floor(this.audio.currentTime % 60);

          // Formatear tiempo como "0:00"
          const formattedTime = minutes.toString() + ":" + seconds.toString().padStart(2, "0");
          
          time.textContent = formattedTime;
      }
      // Llamar a la función de nuevo para que se actualice continuamente
      requestAnimationFrame(() => this.updateProgress());
    }
  }

}
